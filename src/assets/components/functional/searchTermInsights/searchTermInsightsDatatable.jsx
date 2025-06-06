import React, { useContext, useEffect } from "react";
import ExcelDownloadButton from "../../molecules/excelDownloadButton";
import MuiDataTableComponent from "../../common/muidatatableComponent";
import keywordAnalyticsContext from "../../../../store/keywordAnalytics/keywordAnalyticsContext";
import { useSearchParams } from "react-router";
const SearchTermInsightsDatatable = () => {
    const keywordAnalyticsCtx = useContext(keywordAnalyticsContext)
    const { keywordAnalyticsData, getKeywordAnalyticsData } = keywordAnalyticsCtx
    const [searchParams] = useSearchParams();
    const operator = searchParams.get("operator");
    const columnsBlinkit = [
        { field: 'searchTerm', headerName: 'SEARCH TERM', width: 200 },
        { field: 'campaigns', headerName: '# CAMPAIGNS', width: 150 },
        { field: 'isExact', headerName: 'IS EXACT', width: 120 },
        { field: 'impressions', headerName: 'IMPRESSIONS', width: 150 },
        { field: 'spends', headerName: 'SPENDS', width: 150 },
        { field: 'sales', headerName: 'SALES', width: 150 },
        { field: 'cpatc', headerName: 'CPATC', width: 120 },
        { field: 'cpm', headerName: 'CPM', width: 120 },
        { field: 'totalAdSales', headerName: 'TOTAL AD SALES', width: 180 },
        { field: 'troas', headerName: 'TROAS', width: 120 },
        { field: 'adType', headerName: 'AD TYPE', width: 120 },
        { field: 'roas', headerName: 'ROAS', width: 120 }
    ];
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getKeywordAnalyticsData();
        }
    }, [operator]);

    return (
        <React.Fragment>
            <div className=" py-2 border-bottom">
                <div className="row">
                    <div className="col-6">
                        <small className="d-inline-block py-1 px-2 bg-light rounded-pill">
                            report_date = Total 7 Days
                        </small>
                    </div>
                    <div className="col-6 text-end">
                        <ExcelDownloadButton
                            buttonClass="excel-button bg-dark text-white border-dark"
                            buttonLabel="Export" />
                    </div>
                </div>
            </div>
            <div className="datatable-con">
                {/*<MuiDataTableComponent
                    columns={SearchTermColumn}
    data={SearchTermData} />*/}
            </div>
        </React.Fragment>
    )
}

export default SearchTermInsightsDatatable;