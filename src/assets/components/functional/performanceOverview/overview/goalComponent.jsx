import React, {useState} from "react";
import ChartComponent from "../../../common/chartComponent";
import ButtonComponent from "../../../molecules/buttonComponent";
import ExcelDownloadButton from "../../../molecules/excelDownloadButton";
import MuiDataTableComponent from "../../../common/muidatatableComponent";
import Typography from '@mui/material/Typography';
import AddGoalModal from "../modal/addGoalModal";

const GoalComponent = () => {

    const [showGoalModal, setShowGoalModal] = useState(false);

    const pieChartOptions = {
        curveType: "function",
        pieHole: 0.5,
        legend: { position: "bottom" },
        'chartArea': { 'width': '85%' }
    }

    const goalChartData = [
        ["Data", "Number"],
        ["Achieved", 150],
        ["Not Achieved", 250],
    ];

    const GoalViewColumn = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'goal_name', headerName: 'Goal Name', width: 150 },
        { field: 'metric_unit', headerName: 'Metric Unit', width: 150 },
        { field: 'target', headerName: 'Target', width: 150 },
        { field: 'achivement', headerName: 'Achievement', width: 150 },
        { field: 'achivement_percent', headerName: '% Achievement', width: 150 },
        { 
          field: 'goal_status', 
          headerName: 'Goal Status', 
          width: 150,
          renderCell: (params) => (
            <Typography sx={{height:"100%",display:"flex",alignItems:"center"}} color="error">{params.value}</Typography>
          ),
        },
      ];
      
      const GoalData = [
      ];

    return(
        <React.Fragment>
            <AddGoalModal
                showGoalModal={showGoalModal}
                setShowGoalModal={setShowGoalModal} />
            <div className="shadow-box-con top-overview-con">
                <div className="px-3 py-2 border-bottom">
                    <div className="row">
                        <div className="col-lg-6">
                            <h5 className="mb-0">Goals</h5>
                        </div>
                        <div className="col-lg-6 text-end">
                            <ButtonComponent
                                buttonClass="btn btn-sm btn-primary me-3"
                                buttonLabel="Add Goal"
                                onClick={() => setShowGoalModal(true)} /> 
                            <ExcelDownloadButton
                                buttonClass="excel-button bg-dark text-white border-dark"
                                buttonLabel="Export" />
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="row">
                        <div className="col-lg-3">
                            <ChartComponent
                                chartType={'PieChart'}
                                chartData={goalChartData}
                                chartWidth={"100%"}
                                chartHeight="350px"
                                options={pieChartOptions} />
                        </div>
                        <div className="col-lg-9">
                            <div className="datatable-con">
                                <MuiDataTableComponent
                                    columns={GoalViewColumn}
                                    data={GoalData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default GoalComponent;