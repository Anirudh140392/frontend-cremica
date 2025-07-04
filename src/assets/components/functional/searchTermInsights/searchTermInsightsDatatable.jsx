import React, { useEffect, useContext, useState, useRef } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import '../../../styles/keywordsComponent/keywordsComponent.less';
import { Typography } from "@mui/material";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams } from "react-router";
import ColumnPercentageDataComponent from "../../common/columnPercentageDataComponent";

const SearchTermInsightsDatatable = () => {

    const { dateRange, formatDate } = useContext(overviewContext)

    const [keywordAnalysisData, setKeywordAnalysisData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const getKeywordAnalysisData = async () => {
        if (!operator) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setKeywordAnalysisData({});
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
            const response = await fetch(`https://react-api-script.onrender.com/cremica/search-term-analytics?start_date=${startDate}&end_date=${endDate}&platform=${operator}
            `, {
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
            setKeywordAnalysisData(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Previous request aborted due to operator change.");
            } else {
                console.error("Failed to fetch keyword analysis data:", error.message);
                setKeywordAnalysisData({});
            }
        } finally {
            setIsLoading(false);
        }
    };

    const abortControllerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            getKeywordAnalysisData();
        }, 100);

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            clearTimeout(timeout);
        }
    }, [operator, dateRange]);

    const KeywordAnalysisColumnBlinkit = [
        {
            field: "targeting_value",
            headerName: "SEARCH TERM",
            minWidth: 150,
            renderCell: (params) => (
                <div className="text-icon-div">
                    <Typography variant="body2">{params.row.targeting_value}</Typography>
                </div>
            ),
        },
        { field: "campaigns_count", headerName: "# CAMPAIGNS", minWidth: 150 },
        { field: "is_exact", headerName: "IS EXACT", minWidth: 100 },
        {
            field: "sov",
            headerName: "SOV",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.sov} percentValue={params.row.sov_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "sov_diff",
            headerName: "SOV % CHANGE",
            hideable: false
        },
        {
            field: "impressions",
            headerName: "IMPRESSIONS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.impressions} percentValue={params.row.impressions_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "impressions_diff",
            headerName: "IMPRESSIONS % CHANGE",
            hideable: false
        },
        {
            field: "estimated_budget_consumed",
            headerName: "SPENDS",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.estimated_budget_consumed} percentValue={params.row.estimated_budget_consumed_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "estimated_budget_consumed_diff",
            headerName: "SPENDS % CHANGE",
            hideable: false
        },
        {
            field: "direct_sales",
            headerName: "SALES",
            minWidth: 200,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.direct_sales} percentValue={params.row.direct_sales_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "direct_sales_diff",
            headerName: "SALES % CHANGE",
            hideable: false
        },
        {
            field: "cpatc",
            headerName: "CPATC",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.cpatc} percentValue={params.row.cpatc_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cpatc_diff",
            headerName: "CPATC % CHANGE",
            hideable: false
        },
        {
            field: "CPM_x",
            headerName: "CPM",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.CPM_x} percentValue={params.row.cpm_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "cpm_diff",
            headerName: "CPM % CHANGE",
            hideable: false
        },
        {
            field: "total_sales",
            headerName: "TOTAL AD SALES",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.total_sales} percentValue={params.row.total_sales_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "total_sales_diff",
            headerName: "TOTAL AD SALES % CHANGE",
            hideable: false
        },
        {
            field: "roas",
            headerName: "ROAS",
            minWidth: 150,
            renderCell: (params) => (
                <ColumnPercentageDataComponent mainValue={params.row.roas} percentValue={params.row.roas_diff} />
            ), type: "number", align: "left",
            headerAlign: "left",
        },
        {
            field: "roas_diff",
            headerName: "ROAS % CHANGE",
            hideable: false
        },
    ];

    return (
        <React.Fragment>
            <div className="shadow-box-con-keywords aggregated-view-con">
                <div className="datatable-con-sov">
                    <MuiDataTableComponent
                        isLoading={isLoading}
                        isExport={true}
                        columns={KeywordAnalysisColumnBlinkit}
                        data={keywordAnalysisData.data || []} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchTermInsightsDatatable;