import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridFilterPanel, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import overviewContext from "../../../store/overview/overviewContext";
import ExcelDownloadButton from "../molecules/excelDownloadButton";

const CustomFilterPanel = (props) => {

    const handleSearchClick = () => {
        console.log('Search button clicked');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
                <GridFilterPanel {...props} />
            </Box>
            <Button
                onClick={handleSearchClick}
                variant="contained"
                color="primary"
                size="small"
                sx={{ margin: "10px" }}
            >
                Search
            </Button>
        </Box>
    );
};

const MuiDataTableComponent = (props) => {
    const { overviewLoading } = useContext(overviewContext)
    const { columns, data, isExport, isLoading } = props;
    const customLocaleText = {
        filterPanelOperator: 'Condition',
    }

    const isLoadingData = overviewLoading

    const [filterModel, setFilterModel] = useState({ items: [] });

    const handleExport = (columns, rows) => {
        const csvContent = [
            columns.map(col => col.headerName).join(','),
            ...rows.map(row =>
                columns.map(col => {
                    let value = row[col.field];
                    if (col.valueGetter) {
                        value = col.valueGetter({ row });
                    }
                    if (typeof value === 'number') {
                        return value;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'export.csv';
        link.click();
    };

    const CustomToolbar = () => (
        <GridToolbarContainer className="w-100 d-flex justify-content-between align-items-center" sx={{ padding: "8px" }}>
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </div>
            {isExport && <ExcelDownloadButton
                handleExport={handleExport}
                columns={columns}
                rows={data}
                buttonClass="excel-button bg-dark text-white border-dark"
                buttonLabel="Export" />}
        </GridToolbarContainer>
    );
    return (
        <Box sx={{ height: "100%", overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {(isLoading || isLoadingData) ? (<CircularProgress />) : (
                <DataGrid
                    rows={data}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    filterModel={filterModel}
                    onFilterModelChange={setFilterModel}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 100,
                            },
                        },
                    }}
                    pageSizeOptions={[100]}
                    slots={{
                        toolbar: CustomToolbar,
                        filterPanel: CustomFilterPanel,
                    }}
                    slotProps={{
                        filterPanel: {
                        },
                        toolbar: { csvOptions: { allColumns: true } }
                    }}
                    localeText={customLocaleText}
                    columnVisibilityModel={{
                        perc_change_sum_total_budget_burnt: false,
                        perc_change_sum_total_gmv: false,
                        perc_change_calculated_avg_ecpm: false,
                        perc_change_calculated_avg_total_roi: false,
                        estimated_budget_consumed_diff: false,
                        direct_sales_diff: false,
                        cpm_diff: false,
                        total_sales_diff: false,
                        total_roas_diff: false,
                        direct_roas_diff: false,
                        troas_diff: false,
                        impressions_diff: false,
                        direct_atc_diff: false,
                        direct_quantities_sold_diff: false,
                        roas_diff: false,
                        cvr_diff: false,
                        indirect_atc_diff: false,
                        perc_change_sum_total_impressions: false,
                        perc_change_calculated_a2c_rate: false,
                        spend_change: false,
                        roas_change: false,
                        revenue_change: false,
                        atc_change: false,
                        cvr_change: false,
                        impressions_change: false,
                        aov_change: false,
                        clicks_change: false,
                        orders_change: false,
                        cpm_change: false,
                        acos_diff: false,
                        sales_change:false,
                        sov_diff:false,
                        cpatc_diff:false,
                        spends_change:false,
                        direct_revenue_change:false,
                        ctr_change:false,
                        troas_change:false,
                        roas_direct_change:false
                    }}
                />
            )}
        </Box>
    );
};

export default MuiDataTableComponent;
