import React from "react";
import ErrorBoundary from "../../components/common/erroBoundryComponent";
import ProductIntelligenceCenterDatatable from "../../components/functional/productIntelligenceCenter/productIntelligenceCenterDatatable";

const ProductIntelligenceCenter = () => {
    return(
        <React.Fragment>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h1 className="page-heading">Product Intelligence Center</h1>
                            </div>
                            <div className="col text-end">
                                
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <ErrorBoundary>
                            <ProductIntelligenceCenterDatatable />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductIntelligenceCenter;