import React, { useState } from "react";
import CheckIcon from "../../../icons/common/checkIcon";
import TrashIcon from "../../../icons/common/trashIcon";
import DataTableComponent from "../../common/datatableComponent";
import ToggleOnOffComponent from "../../common/toggleOnOffComponent";
import ExcelDownloadButton from "../../molecules/excelDownloadButton";
import TextFieldComponent from "../../molecules/textFieldCompnent";

const ProductsComponent = () => {

    const [statusToggle, setStatusToggle] = useState(true)

    const ProductsViewColumn = [
        {
            name: 'Product',
            selector: row => 
                <span>
                    <input type="checkbox" className="me-1" />
                    {row.product}
                </span>,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Status',
            selector: row => 
                <ToggleOnOffComponent
                    onChange={() => setStatusToggle(!statusToggle)}
                    statusToggle={statusToggle} />,
            sortable: false,
            width: '100px'
        },
        {
            name: 'Ad Group',
            selector: row => row.adgroup,
            sortable: false,
            width: '220px'
        },
        {
            name: 'Campaign',
            selector: row => row.campaign,
            sortable: false,
            width: '150px'
        },  
        {
            name: 'Ad Type',
            selector: row => row.ad_type,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Spends',
            selector: row => row.spends,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Sales',
            selector: row => row.sales,
            sortable: false,
            width: '150px'
        },
        {
            name: 'CTR',
            selector: row => row.ctr,
            sortable: false,
            width: '150px'
        },
        {
            name: 'ROAS',
            selector: row => row.roas,
            sortable: false,
            width: '150px'
        },
    ]

    const ProductsData = [
        {
            portfolio: 'Derma new',
            impression: '97,82.345',
            clicks: '21,322',
            spends: '2,72,806',
            orders: '806',
            sales: '2,08,034',
            sales: '0.8',
            sales: '0.2%',
        }
    ]

    return(
        <React.Fragment>
            <div className="shadow-box-con aggregated-view-con">
                <div className="px-3 py-2 border-bottom">
                    <div className="row">
                        <div className="col-12 text-end">
                            <ExcelDownloadButton
                                buttonClass="excel-button bg-dark text-white border-dark"
                                buttonLabel="Export" />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="datatable-con">
                    <DataTableComponent
                        columns={ProductsViewColumn}
                        data={ProductsData} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductsComponent;