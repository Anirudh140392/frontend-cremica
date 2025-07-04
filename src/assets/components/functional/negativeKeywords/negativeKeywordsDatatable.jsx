import React, { useMemo, useEffect, useContext, useState, useRef } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import '../../../styles/keywordsComponent/keywordsComponent.less';
import { Switch, Typography, Snackbar, Alert } from "@mui/material";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";

const NegativeKeywordsDatatable = () => {

    const { dateRange, getBrandsData, brands, formatDate } = useContext(overviewContext)

    const [keywordsData, setKeywordsData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const STATUS_OPTIONS = [
        { value: 1, label: 'Active' },
        { value: 0, label: 'Paused' }
    ]

    const getKeywordsData = async () => {
        if (!operator) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setKeywordsData({});
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
            const response = await fetch(`https://react-api-script.onrender.com/cremica/suggested-negative-keyword?platform=${operator}&start_date=${startDate}&end_date=${endDate}`, {
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
            setKeywordsData(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Previous request aborted due to operator change.");
            } else {
                console.error("Failed to fetch keywords data:", error.message);
                setKeywordsData({});
            }
        } finally {
            setIsLoading(false);
        }
    };

    const abortControllerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            getKeywordsData();
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

    const KeywordsColumnSwiggy = [
        {
            field: "keyword_y",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer redirect" onClick={() => handleKeywordClick(params.row.keyword_y, params.row.campaign_id_y)}>
                    <Typography variant="body2">{params.row.keyword_y}</Typography>
                </div>
            ),
        },
        {
            field: "ad_property_y",
            headerName: "AD TYPE",
            minWidth: 200,
        },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
        { field: "targeting_type", headerName: "KEYWORD TYPE", minWidth: 150, renderCell: () => "Keyword", },
        {
            field: "brand_name_y", headerName: "BRAND", minWidth: 150, type: "singleSelect", valueOptions: brands?.brands || []
        },
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
        },
        {
            field: "calculated_a2c_rate_y",
            headerName: "CONVERSION",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.calculated_a2c_rate_y} percentValue={params.row.perc_change_calculated_a2c_rate} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "perc_change_calculated_a2c_rate",
            headerName: "CONVERSION % CHANGE",
        },
        { field: "match_type", headerName: "MATCH TYPE", minWidth: 200 },
    ];

    const KeywordsColumnBlinkit = [
        {
            field: "targeting_value",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer redirect" onClick={() => handleKeywordClick(params.row.targeting_value, params.row.campaign_id)}>
                    <Typography variant="body2">{params.row.targeting_value}</Typography>
                </div>
            ),
        },
        { field: "campaign_objective_type", headerName: "AD TYPE", minWidth: 150, },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
        {
            field: "impressions_x",
            headerName: "IMPRESSIONS",
            minWidth: 170,
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
            field: "direct_atc_x",
            headerName: "DIRECT ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_atc_x} percentValue={params.row.direct_atc_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
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
            field: "acos_x",
            headerName: "ACOS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.acos_x} percentValue={params.row.acos_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "acos_diff",
            headerName: "ACOS % CHANGE",
        },
    ];

    const KeywordsColumnZepto = [
        {
            field: "keyword_name",
            headerName: "TARGET",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div cursor-pointer">
                    <Typography variant="body2">{params.row.keyword_name}</Typography>
                </div>
            ),
        },
        {
            field: "status",
            headerName: "BID STATUS",
            minWidth: 100,
            renderCell: () => <Switch checked={1} />,
        },
        { field: "keyword_type", headerName: "KEYWORD TYPE", minWidth: 150, },
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
            field: "revenue",
            headerName: "SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.revenue} percentValue={params.row.revenue_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "revenue_change",
            headerName: "SALES % CHANGE",
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
        {
            field: "atc",
            headerName: "ATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.atc} percentValue={params.row.atc_change} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "atc_change",
            headerName: "ATC % CHANGE",
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
            headerName: "CVR % CHANGE",
        },
        { field: "match_type", headerName: "MATCH TYPE", minWidth: 150, },
        {
            field: "ad_type", headerName: "AD TYPE", minWidth: 150,
        },
        {
            field: "campaign_name",
            headerName: "CAMPAIGN",
            minWidth: 300,
        },
    ];

    const columns = useMemo(() => {
        if (operator === "Swiggy") return KeywordsColumnSwiggy;
        if (operator === "Blinkit") return KeywordsColumnBlinkit;
        if (operator === "Zepto") return KeywordsColumnZepto;
        return [];
    }, [operator, brands]);

    const handleSnackbarOpen = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <React.Fragment>
            <div className="shadow-box-con-keywords aggregated-view-con">
                <div className="datatable-con-negative-keywords">
                    <MuiDataTableComponent
                        isLoading={isLoading}
                        isExport={true}
                        columns={columns}
                        data={keywordsData.data || []} />
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

export default NegativeKeywordsDatatable;