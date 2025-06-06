import React from "react";
import { Link } from "react-router";
import TrashIcon from "../../../icons/common/trashIcon";
import RedirectURLIcon from "../../../icons/productIntelligeceCenter/redirectURLIcon";
import DataTableComponent from "../../common/datatableComponent";
import ExcelDownloadButton from "../../molecules/excelDownloadButton";
import RadioCheckboxComponent from "../../molecules/radioCheckboxComponent";

const ProductIntelligenceCenterDatatable = () => {

    const SearchTermColumn = [
        {
            name: 'Product',
            selector: row => <span>
                <RadioCheckboxComponent
                    fieldType="checkbox"
                    fieldName="searchTerm"
                    ariaLabel="search-term"
                    fieldLabel={row.productName} />
            </span>,
            sortable: false,
            width: '250px'
        },
        {
            name: 'Product Page',
            selector: row => <Link to={row.product_page} target='_blank' >
                <RedirectURLIcon
                    iconWidth="20"
                    iconHeight="20"
                    iconColor="#007bff" />
            </Link>,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Action',
            selector: row => <span>
                <TrashIcon
                    iconClass="me-4 cursor-pointer"
                    iconWidth="13"
                    iconHeight="13"
                    iconColor="#000" />
            </span>,
            sortable: false,
            width: '150px'
        },
        {
            name: 'BSR',
            selector: row => row.bsr,
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
            name: 'Orders',
            selector: row => row.orders,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Impression',
            selector: row => row.impression,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Clicks',
            selector: row => row.clicks,
            sortable: false,
            width: '150px'
        },
        {
            name: 'BB Winner',
            selector: row => row.bb_winner,
            sortable: false,
            width: '200px'
        },
        {
            name: 'Rating',
            selector: row => row.rating,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Ratings',
            selector: row => row.ratings,
            sortable: false,
            width: '150px'
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: false,
            width: '150px'
        },
        {
            name: 'AVL %',
            selector: row => row.avl,
            sortable: false,
            width: '150px'
        },
    ]

    const SearchTermData = [
        {
            productName: 'NIVEA Body Lotion for Very Dry Skin  Nourishing Body Milk with 2x Almond Oil 48H Moisturization, For Men & Women, 600 ml',
            category: 'Lotion',
            bsr: '2',
            spends: '260219',
            sales: '542876',
            ctr: '2.1%',
            orders: '1610',
            impression: '1978172',
            clicks: '10080',
            bb_winner: 'RK World Infocom Pvt Ltd',
            rating: '4.4',
            ratings: '51504',
            price: '405.4',
            avl: '100%',
        }
    ]

    return(
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
                <DataTableComponent
                    columns={SearchTermColumn}
                    data={SearchTermData} />
            </div>
        </React.Fragment>
    )
}

export default ProductIntelligenceCenterDatatable;