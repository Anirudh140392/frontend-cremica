import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import '../../../styles/campaignsComponent/campaignsComponent.less';
import overviewContext from "../../../../store/overview/overviewContext";
import { CircularProgress, Switch, Box, Button, Snackbar, Alert } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSearchParams } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";
import TrendsModal from "./modal/trendsModal";
import BudgetCell from "./overview/budgetCell";

const CampaignsComponent = () => {

    const dataContext = useContext(overviewContext)
    const { dateRange, brands, getBrandsData, formatDate } = dataContext

    const [updatingCampaigns, setUpdatingCampaigns] = useState({});
    const [showTrendsModal, setShowTrendsModal] = useState({ name: '', show: false, date: [] })
    const [campaignsData, setCampaignsData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [confirmation, setConfirmation] = useState({ show: false, campaignId: null, newStatus: null, brandId: null });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const STATUS_OPTIONS = [
        { value: 1, label: 'Active' },
        { value: 0, label: 'Paused' }
    ]

    const CampaignsColumnBlinkit = [
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Box className="redirect" sx={{ cursor: "pointer" }} onClick={() => handleCampaignClick(params.row.campaign_name, params.row.campaign_id)}>
                        {params.row.campaign_name}
                    </Box>
                </Box>
            ),
        },
        {
            field: "campaign_budget",
            headerName: "BUDGET",
            minWidth: 200,
            type: "number", align: "left",
            headerAlign: "left",
            renderCell: (params) => <BudgetCell value={params.row.campaign_budget} campaignId={params.row.campaign_id} endDate={params.row.end_date || null} platform={operator}
                onUpdate={(campaignId, newBudget) => {
                    console.log("Updating campaign:", campaignId, "New budget:", newBudget);
                    setCampaignsData(prevData => {
                        const updatedData = {
                            ...prevData,
                            data: prevData.data.map(campaign =>
                                campaign.campaign_id === campaignId
                                    ? { ...campaign, campaign_budget: newBudget }
                                    : campaign
                            )
                        };
                        console.log("Updated campaignsData:", updatedData);
                        return updatedData;
                    });
                }} onSnackbarOpen={handleSnackbarOpen} />,

        },
        {
            field: "status",
            headerName: "STATUS",
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                if (updatingCampaigns[params.row.campaign_id]) {
                    return <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress size={24} /></Box>;
                }
                return (
                    <Switch
                        checked={params.row.status === 1}
                        onChange={() => handleToggle(params.row.campaign_id, params.row.status === 1 ? 1 : 0, null)}
                    />
                )
            },
            type: "singleSelect",
            valueOptions: STATUS_OPTIONS
        },
        { field: "campaign_objective_type", headerName: "AD TYPE", minWidth: 150, },
        { field: "campaign_brand_name", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands },
        {
            field: "estimated_budget_consumed_x",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.estimated_budget_consumed_x} percentValue={params.row.estimated_budget_consumed_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "estimated_budget_consumed_diff",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "direct_sales_x",
            headerName: "DIRECT SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_sales_x} percentValue={params.row.direct_sales_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "direct_sales_diff",
            headerName: "DIRECT SALES % CHANGE",
        },
        {
            field: "total_sales_x",
            headerName: "TOTAL AD SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_sales_x} percentValue={params.row.total_sales_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "total_sales_diff",
            headerName: "TOTAL AD SALES % CHANGE",
        },
        {
            field: "impressions_x",
            headerName: "IMPRESSIONS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.impressions_x} percentValue={params.row.impressions_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "impressions_diff",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "cvr_x",
            headerName: "CVR",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cvr_x} percentValue={params.row.cvr_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cvr_diff",
            headerName: "ATC RATE % CHANGE",
        },
        {
            field: "direct_atc_x",
            headerName: "DIRECT ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_atc_x} percentValue={params.row.direct_atc_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "direct_atc_diff",
            headerName: "DIRECT ATC % CHANGE",
        },
        {
            field: "indirect_atc_x",
            headerName: "INDIRECT ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.indirect_atc_x} percentValue={params.row.indirect_atc_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "indirect_atc_diff",
            headerName: "INDIRECT ATC % CHANGE",
        },
        {
            field: "total_atc_x",
            headerName: "TOTAL ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_atc_x} percentValue={params.row.total_atc_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "direct_quantities_sold_x",
            headerName: "ORDERS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_quantities_sold_x} percentValue={params.row.direct_quantities_sold_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "direct_quantities_sold_diff",
            headerName: "ORDERS % CHANGE",
        },
        {
            field: "cpm_x",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpm_x} percentValue={params.row.cpm_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cpm_diff",
            headerName: "CPM % CHANGE",
        },
        {
            field: "roas_x",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas_x} percentValue={params.row.roas_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "roas_diff",
            headerName: "DIRECT ROAS % CHANGE",
        },
    ];

    const CampaignsColumnSwiggy = [
        {
            field: "campaign_name_x",
            headerName: "CAMPAIGN",
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Box className="redirect" sx={{ cursor: "pointer" }} onClick={() => handleCampaignClick(params.row.campaign_name_x, params.row.campaign_id)}>
                        {params.row.campaign_name_x}
                    </Box>
                </Box>
            ),
        },
        {
            field: "sum_total_budget_y",
            headerName: "BUDGET",
            minWidth: 200,
            renderCell: (params) => <BudgetCell value={params.row.sum_total_budget_y} />, type: "number", align: "center",
            headerAlign: "center",
            type: "number"
        },
        { field: "ad_type_y", headerName: "AD TYPE", minWidth: 150 },
        { field: "brand_name", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands },
        {
            field: "sum_total_budget_burnt_y",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sum_total_budget_burnt_y} percentValue={params.row.perc_change_sum_total_budget_burnt} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_sum_total_budget_burnt",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "sum_total_gmv_y",
            headerName: "DIRECT SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sum_total_gmv_y} percentValue={params.row.perc_change_sum_total_gmv} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_sum_total_gmv",
            headerName: "DIRECT SALES % CHANGE",
        },
        {
            field: "sum_total_impressions_y",
            headerName: "IMPRESSIONS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sum_total_impressions_y} percentValue={params.row.perc_change_sum_total_impressions} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_sum_total_impressions",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "avg_a2c_rate_y",
            headerName: "CONVERSIONS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_a2c_rate_y} percentValue={params.row.perc_change_avg_a2c_rate} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "calculated_avg_ecpm_y",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_avg_ecpm_y} percentValue={params.row.perc_change_calculated_avg_ecpm} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_calculated_avg_ecpm",
            headerName: "CPM % CHANGE",
        },
        {
            field: "calculated_avg_total_roi_y",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_avg_total_roi_y} percentValue={params.row.perc_change_calculated_avg_total_roi} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_calculated_avg_total_roi",
            headerName: "DIRECT ROAS % CHANGE",
        }];

    const CampaignsColumnZepto = [
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Box className="redirect" onClick={() => handleCampaignClick(params.row.campaign_name, params.row.campaign_id)} sx={{ cursor: "pointer" }}>
                        {params.row.campaign_name}
                    </Box>
                </Box>
            ),
        },
        {
            field: "smart_daily_budget",
            headerName: "BUDGET",
            minWidth: 200,
            renderCell: (params) => <BudgetCell value={params.row.smart_daily_budget} campaignId={params.row.campaign_id} endDate={params.row.end_date || null} platform={operator}
                onUpdate={(campaignId, newBudget) => {
                    console.log("Updating campaign:", campaignId, "New budget:", newBudget);
                    setCampaignsData(prevData => {
                        const updatedData = {
                            ...prevData,
                            data: prevData.data.map(campaign =>
                                campaign.campaign_id === campaignId
                                    ? { ...campaign, smart_daily_budget: newBudget }
                                    : campaign
                            )
                        };
                        console.log("Updated campaignsData:", updatedData);
                        return updatedData;
                    });
                }} onSnackbarOpen={handleSnackbarOpen} />, type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "STATUS",
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                if (updatingCampaigns[params.row.campaign_id]) {
                    return <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress size={24} /></Box>;
                }
                return (
                    <Switch
                        checked={params.row.status === 1}
                        onChange={() => handleToggle(params.row.campaign_id, params.row.status === 1 ? 1 : 0, params.row.brand_id)}
                    />
                )
            },
            type: "singleSelect",
            valueOptions: STATUS_OPTIONS
        },
        { field: "ad_type", headerName: "AD TYPE", minWidth: 150 },
        { field: "brand_name", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands },
        {
            field: "spend",
            headerName: "SPENDS",
            minWidth: 170,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.spend} percentValue={params.row.spend_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "spend_change",
            headerName: "SPENDS % CHANGE",
        },
        {
            field: "sales",
            headerName: "DIRECT SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sales} percentValue={params.row.sales_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "sales_change",
            headerName: "DIRECT SALES % CHANGE",
        },
        {
            field: "impressions",
            headerName: "IMPRESSIONS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.impressions} percentValue={params.row.impressions_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "impressions_change",
            headerName: "IMPRESSIONS % CHANGE",
        },
        {
            field: "cvr",
            headerName: "CVR",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cvr} percentValue={params.row.cvr_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cvr_change",
            headerName: "ATC RATE % CHANGE",
        },
        {
            field: "clicks",
            headerName: "CLICKS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.clicks} percentValue={params.row.clicks_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "clicks_change",
            headerName: "CLICKS % CHANGE",
        },
        {
            field: "aov",
            headerName: "AOV",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.aov} percentValue={params.row.aov_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "aov_change",
            headerName: "AOV % CHANGE",
        },
        {
            field: "orders",
            headerName: "ORDERS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.orders} percentValue={params.row.orders_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "orders_change",
            headerName: "ORDERS % CHANGE",
        },
        {
            field: "cpm",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpm} percentValue={params.row.cpm_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cpm_change",
            headerName: "CPM % CHANGE",
        },
        {
            field: "roas",
            headerName: "DIRECT ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas} percentValue={params.row.roas_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "roas_change",
            headerName: "DIRECT ROAS % CHANGE",
        },
    ];

    const getCampaignsData = async () => {
        if (!operator) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setCampaignsData({});
        setIsLoading(true);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            setIsLoading(false);
            return;
        }

        const startDate = formatDate(dateRange[0].startDate);
        const endDate = formatDate(dateRange[0].endDate);

        try {
            const response = await fetch(`https://react-api-script.onrender.com/cremica/campaign?start_date=${startDate}&end_date=${endDate}&platform=${operator}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setCampaignsData(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Previous request aborted due to operator change.");
            } else {
                console.error("Failed to fetch keywords data:", error.message);
                setCampaignsData({});
            }
        } finally {
            setIsLoading(false);
        }
    };

    const abortControllerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            getCampaignsData();
        }, 100);

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            clearTimeout(timeout);
        }
    }, [operator, dateRange]);

    useEffect(() => {
        getBrandsData()
    }, [operator])

    const columns = useMemo(() => {
        if (operator === "Swiggy") return CampaignsColumnSwiggy;
        if (operator === "Blinkit") return CampaignsColumnBlinkit;
        if (operator === "Zepto") return CampaignsColumnZepto;
        return [];
    }, [operator, brands, updatingCampaigns]);

    const handleCampaignClick = async (campaignName, campaignId) => {
        try {
            const token = localStorage.getItem("accessToken");
            const startDate = formatDate(dateRange[0].startDate);
            const endDate = formatDate(dateRange[0].endDate);
            const response = await fetch(`https://react-api-script.onrender.com/cremica/campaign-graph?end_date=${formatDate(endDate)}&platform=${operator}&campaign_id=${campaignId}&&start_date=${formatDate(startDate)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json()
            if (response.ok) {
                setShowTrendsModal({ name: campaignName, show: true, data: data });
            } else {
                console.error("Failed to fetch campaign data");
            }
        } catch (error) {
            console.error("Error fetching campaign data", error);
        }
    };

    const handleToggle = (campaignId, currentStatus, brandId) => {
        setConfirmation({ show: true, campaignId, newStatus: currentStatus ? 0 : 1, brandId });
    };

    const updateCampaignStatus = (campaignId, newStatus) => {
        setCampaignsData(prevData => ({
            ...prevData,
            data: prevData.data.map(campaign =>
                campaign.campaign_id === campaignId ? { ...campaign, status: newStatus } : campaign
            )
        }));
    };

    const confirmStatusChange = async () => {
        setConfirmation({ show: false, campaignId: null, newStatus: null, brandId: null });
        const { campaignId, newStatus, brandId } = confirmation;
        if (!campaignId) return;
        setUpdatingCampaigns(prev => ({ ...prev, [campaignId]: true }));

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No access token found");

            const response = await fetch('https://react-api-script.onrender.com/app/action', {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    platform: operator,
                    campaign_id: campaignId.toString(),
                    status_id: newStatus.toString(),
                    brand_id: brandId
                })
            });

            if (!response.ok) throw new Error("Failed to update campaign status");
            updateCampaignStatus(campaignId, newStatus);
            handleSnackbarOpen("Status updated successfully!", "success");
        } catch (error) {
            console.error("Error updating campaign status:", error);
            handleSnackbarOpen("Failed to update status!", "error");
        } finally {
            setUpdatingCampaigns(prev => {
                const newState = { ...prev };
                delete newState[campaignId];
                return newState;
            });
        }
    };

    const handleSnackbarOpen = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <React.Fragment>
            <Dialog open={confirmation.show} onClose={() => setConfirmation({ show: false, campaignId: null, newStatus: null, brandId: null })}>
                <DialogTitle>Confirm Status Change</DialogTitle>
                <DialogContent>Are you sure you want to {confirmation.newStatus ? "activate" : "pause"} this campaign?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmation({ show: false, campaignId: null, newStatus: null, brandId: null })}>Cancel</Button>
                    <Button onClick={confirmStatusChange} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
            <TrendsModal
                showTrendsModal={showTrendsModal}
                setShowTrendsModal={setShowTrendsModal} />
            <div className="shadow-box-con-campaigns aggregated-view-con">
                <div className="datatable-con-campaigns">
                    <MuiDataTableComponent
                        isLoading={isLoading}
                        isExport={true}
                        columns={columns}
                        data={campaignsData?.data} />
                </div>
            </div>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default CampaignsComponent;