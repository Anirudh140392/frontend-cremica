import React, { useEffect, useMemo, useState, useRef } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

const HistoryDatatable = () => {

    const [historyData, setHistoryData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const getColorCode = (value1, value2) => {
        if (value1 === value2) {
            return "#ffc107"
        }
        else if (value1 < value2) {
            return "#dc3545"
        }
        else {
            return "#198754"
        }
    }

    const HistoryColumnsZepto = [
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "from_value", headerName: "FROM", minWidth: 150 },
        { field: "to_value", headerName: "TO", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "campaign_id", headerName: "Campaign ID", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", minWidth: 250 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "total_keywords", headerName: "Total Keywords", minWidth: 150, type: "number", align: "left", headerAlign: "left" },
        { field: "updated_keywords", headerName: "Updated Keywords", minWidth: 150, type: "number", align: "left", headerAlign: "left" },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 }

    ];

    const HistoryColumnsBlinkit = [
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "from_value", headerName: "FROM", minWidth: 150 },
        { field: "to_value", headerName: "TO", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", minWidth: 200 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 },
    ];

    const HistoryColumnsSwiggy = [
        { field: "date", headerName: "Date", minWidth: 150 },
        { field: "time", headerName: "Time", minWidth: 150 },
        { field: "module", headerName: "Module", minWidth: 150 },
        { field: "type", headerName: "Type", minWidth: 150 },
        { field: "property", headerName: "Property", minWidth: 150 },
        { field: "from_value", headerName: "FROM", minWidth: 150 },
        { field: "to_value", headerName: "TO", minWidth: 150 },
        { field: "nature", headerName: "Nature", minWidth: 150 },
        { field: "source_name", headerName: "Source Name", minWidth: 150 },
        { field: "campaign_name", headerName: "Campaign Name", width: 250 },
        { field: "keyword", headerName: "Keyword", minWidth: 150 },
        { field: "platform", headerName: "Platform", minWidth: 150 },
        { field: "user_name", headerName: "User Name", minWidth: 150 },
        { field: "suggestion", headerName: "Suggestion", minWidth: 300 },
    ];

    const getHistoryData = async () => {
        if (!operator) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://react-api-script.onrender.com/app/history?platform=${operator}`, {
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
            setHistoryData(data);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Previous request aborted due to operator change.");
            } else {
                console.error("Failed to fetch keywords data:", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getHistoryData();
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [operator]);

    const abortControllerRef = useRef(null);

    const selectedColumns = useMemo(() => {
        switch (operator) {
            case "Zepto": return HistoryColumnsZepto;
            case "Blinkit": return HistoryColumnsBlinkit;
            default: return HistoryColumnsSwiggy;
        }
    }, [operator]);

    return (
        <React.Fragment>
            <div className="datatable-con">
                <MuiDataTableComponent
                    isLoading={isLoading}
                    columns={selectedColumns}
                    data={historyData?.data || []} />
            </div>
        </React.Fragment>
    )
}

export default HistoryDatatable;