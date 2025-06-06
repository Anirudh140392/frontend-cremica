import React, { useEffect } from "react";
import { useContext } from "react";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import overviewContext from "../../../../store/overview/overviewContext";
import { useSearchParams } from "react-router";
import OverviewFunnelChart from "./overview/overviewFunnelChart";

const OverviewComponent = () => {
    const dataContext = useContext(overviewContext)
    const { overviewData, getOverviewData, dateRange, formatDate } = dataContext
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");

    const selectOptions = [
        { label: 'All', value: 'ALL' },
        { label: 'SP', value: 'SP' },
        { label: 'SB', value: 'SB' },
        { label: 'SD', value: 'SD' },
    ]

    const OverviewColumnsBlinkit = [
        { field: "campaign_tags", headerName: "Campaign Tags", minWidth: 200 },
        { field: "estimated_budget_consumed_x", headerName: "Budget Consumed", minWidth: 200 },
        { field: "total_sales_x", headerName: "Total Sales", minWidth: 200 },
        {
            field: "impressions_x", headerName: "Impressions", minWidth: 200, type: "number", align: "left",
            headerAlign: "left",
        },
        { field: "cpm_x", headerName: "CPM", type: "number", minWidth: 200, align: "left", headerAlign: "left" },
        { field: "roas_x", headerName: "ROAS", type: "number", minWidth: 200, align: "left", headerAlign: "left" }
    ]

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getOverviewData();
        }
    }, [operator, dateRange, getOverviewData]);

    const CTRWidget = ({ firstHeadingText, firstHeadingData, secondHeadingText, secondHeadingData, isSecondHeadingRequired = true }) => {
        return (
            <div className="ctr-card-main-con">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="card-title text-aqua">{firstHeadingText}</h5>
                            <h3 className="mb-0">{firstHeadingData}</h3>
                        </div>
                        {isSecondHeadingRequired &&
                            <div>
                                <h5 className="card-title text-peach">{secondHeadingText}</h5>
                                <h3 className="mb-0">{secondHeadingData}</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    function toMillions(num) {
        return (num / 1_000_000).toFixed(2) + "M";
    }

    function toThousands(num) {
        return (num / 1_000).toFixed(2) + "K";
    }

    const daysDifference = () => {
        if (!dateRange?.length) return 0;
        const startDate = new Date(dateRange[0].startDate);
        const endDate = new Date(dateRange[0].endDate);
        const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        return diff === 6 ? diff + 1 : diff;
    }

    return (
        <React.Fragment>
            <div className="shadow-box-con top-overview-con">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 d-md-flex flex-md-column">
                        <div className="svg-data-filter-con">
                            <p>
                                Compared to {daysDifference} days ago.{" "}
                                {`${formatDate(dateRange[0].startDate)}-`}
                                <br />
                                {`${formatDate(dateRange[0].endDate)}`}
                            </p>

                        </div>
                        <OverviewFunnelChart data={overviewData?.funnel} />
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Impressions"
                                    firstHeadingData={`${overviewData?.metrics_data?.total_impressions ? toMillions(overviewData?.metrics_data?.total_impressions) : "-"}`}
                                    isSecondHeadingRequired={false} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="CPM"
                                    firstHeadingData={`${overviewData?.metrics_data?.avg_cpm ? overviewData?.metrics_data?.avg_cpm : "-"}`}
                                    secondHeadingText="Orders"
                                    secondHeadingData={`${overviewData?.metrics_data?.total_orders ? toThousands(overviewData?.metrics_data?.total_orders) : "-"}`} />
                            </div>
                            <div className="col-md-4">
                                <CTRWidget
                                    firstHeadingText="Total Spends"
                                    firstHeadingData={`${overviewData?.metrics_data?.total_spends ? toMillions(overviewData?.metrics_data?.total_spends) : "-"}`}
                                    secondHeadingText="ROAS"
                                    secondHeadingData={`${overviewData?.metrics_data?.avg_roas ? overviewData?.metrics_data?.avg_roas : "-"}`} />
                            </div>
                        </div>
                        <div className="agrregated-shadow-box-con aggregated-view-con mt-4">
                            <div className="px-3 py-2 border-bottom">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5 className="mb-0">Category View</h5>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="datatable-con-overview">
                                <MuiDataTableComponent
                                    isExport={true}
                                    columns={OverviewColumnsBlinkit}
                                    data={overviewData?.cat_table} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="agrregated-shadow-box-con aggregated-view-con">
                <div className="px-3 py-2 border-bottom">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="mb-0">Subcategory View</h5>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="datatable-con-overview">
                    <MuiDataTableComponent
                        isExport={true}
                        columns={SubCategoryColumns}
                        data={filteredSubCatData} />
                </div>
            </div>
            <ErrorBoundary>
                <GoalComponent />
            </ErrorBoundary>*/}
        </React.Fragment>
    )
}

export default OverviewComponent;