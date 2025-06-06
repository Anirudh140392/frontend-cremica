import React, { useState } from "react";
import ErrorBoundary from "../../components/common/erroBoundryComponent";
import SearchTermInsightsDatatable from "../../components/functional/searchTermInsights/searchTermInsightsDatatable";

const SearchTermInsights = () => {
    return(
        <React.Fragment>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h1 className="page-heading">Keyword Analysis</h1>
                            </div>
                            <div className="col text-end">
                                
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <ErrorBoundary>
                            <SearchTermInsightsDatatable />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchTermInsights;