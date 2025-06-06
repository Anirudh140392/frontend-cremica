import React, { useState } from "react";
import PencilEditIcon from "../../../icons/common/pencilEditIcon";
import DataTableComponent from "../../common/datatableComponent";
import ToggleOnOffComponent from "../../common/toggleOnOffComponent";
import ExcelDownloadButton from "../../molecules/excelDownloadButton";

const AdGroupsComponent = () => {

    const [statusToggle, setStatusToggle] = useState(true)

    const AdGroupsViewColumn = [
        {
            name: 'Ad Group',
            selector: row => 
                <span>
                    <input type="checkbox" className="me-1" />
                    {row.adgroup}
                </span>,
            sortable: false,
            width: '150px'
        },
        {
            name: '',
            selector: row => <button className="py-1 px-2 bg-white rounded border">
                                <PencilEditIcon
                                    iconWidth="13"
                                    iconHeight="13"
                                    iconColor="#000" />
                            </button>,
            sortable: false,
            width: '80px'
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
            name: 'Campaign',
            selector: row => row.campaign,
            sortable: false,
            width: '220px'
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
            name: 'Impressions',
            selector: row => row.impression,
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

    const AdGroupsData = [
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
                        columns={AdGroupsViewColumn}
                        data={AdGroupsData} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdGroupsComponent;