import React, {useState} from "react";
import TrashIcon from "../../../../icons/common/trashIcon";
import ButtonComponent from "../../../molecules/buttonComponent";
import RadioCheckboxComponent from "../../../molecules/radioCheckboxComponent";
import SelectFieldComponent from "../../../molecules/selectFieldComponent";
import TextFieldComponent from "../../../molecules/textFieldCompnent";

const defaultValue = {
    goalName: '',
    dataLevel: '',
    dataValue: '',
    metricLevel: '',
    metricValueCondition: '',
    conditions: [{
        conditionKey: '',
        conditionValue: ''
    }],
    timePeriod: '',
    priorityRadio: 'Low'
}

const AddGoalCreator = (props) => {

    const [goalData, setGoalData] = useState(defaultValue);

    const dataLevelOptions = [
        {label: 'Product Tag', value: 'Product Tag'},
        {label: 'Keyword', value: 'Keyword'},
    ]

    const dataValueOptions = []

    const metricLevelOptions = []

    const metricValueConditionOptions = []

    const conditionOptions = []

    const timePeriodOptions = []

    const onCondtionChange = (val, i) => {
        goalData.conditions[i].conditionKey = val
        setGoalData({...goalData});
    }

    const onCondtionValueChange = (val, i) => {
        goalData.conditions[i].conditionValue = val
        setGoalData({...goalData});
    }

    const OnIncreaseGoalCondition = (e) => {
        e.preventDefault();
        const data = goalData;
		data.conditions.push({
            conditionKey: '',
            conditionValue: ''
        })
		setGoalData({...goalData, data});
        console.log(goalData)
    }

    const OnDecreaseGoalCondition = (i) => {
        const temp = [...goalData.conditions];
        console.log(temp)
        temp.splice(i, 1);
        goalData.conditions = temp
        setGoalData({...goalData});
    }

    const SubmitData = (e) => {
        e.preventDefault();
        console.log('goalData', goalData);
    }


    return(
        <React.Fragment>
            <form className="addgoal-form">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <TextFieldComponent
                                isFieldLabelRequired={true}
                                fieldType="text"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Goal Name"
                                fieldClass="form-control"
                                areaLabel="name"
                                fieldPlaceholder="Enter goal name"
                                fieldValue={goalData.goalName}
                                onChange={(e) => setGoalData({...goalData, goalName: e.target.value})} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired="true"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Data Level"
                                fieldClass="form-select"
                                areaLabel="data level"
                                options={dataLevelOptions}
                                onChange={e => setGoalData({...goalData, dataLevel: e.target.value})} />
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired="true"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Data Value"
                                fieldClass="form-select"
                                areaLabel="data value"
                                options={dataValueOptions}
                                onChange={e => setGoalData({...goalData, dataValue: e.target.value})} />
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired="true"
                                fieldLabelClass="label text-dark"
                                fieldLabelText="Metric"
                                fieldClass="form-select"
                                areaLabel="metric"
                                options={metricLevelOptions}
                                onChange={e => setGoalData({...goalData, metricLevel: e.target.value})} />
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <label className="label text-dark">Metric Value</label>
                        <div className="form-group mb-3">
                            <div className="d-flex metric-flex">
                                <SelectFieldComponent
                                    fieldClass="form-select rounded-end-0"
                                    areaLabel="actions-select"
                                    options={metricValueConditionOptions}
                                    onChange={(e) => setGoalData({...goalData, metricValueCondition: e.target.value})} />
                                <TextFieldComponent
                                    fieldClass="form-control rounded-start-0"
                                    fieldType="text"
                                    areaLabel="action-value"
                                    fieldPlaceholder="Enter value"
                                    fieldValue={goalData.metricValue}
                                    onChange={(e) => setGoalData({...goalData, metricValue: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {goalData.conditions.map((c, idx) => {
                        return(
                            <React.Fragment key={c.id || idx}>
                                <div key={idx} className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group mb-3">
                                        <SelectFieldComponent
                                            isFieldLabelRequired="true"
                                            fieldLabelClass="label text-dark"
                                            fieldLabelText={`Condition - ${idx+1}`}
                                            fieldClass="form-select"
                                            areaLabel={`condition${idx+1}`}
                                            options={conditionOptions}
                                            onChange={e => onCondtionChange(e, c, idx)} />
                                    </div>
                                </div>  
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group mb-3">
                                        <div className="d-flex align-items-end">
                                            <div className="w-100">
                                                <TextFieldComponent
                                                    isFieldLabelRequired={true}
                                                    fieldType="text"
                                                    fieldLabelClass="label text-dark"
                                                    fieldLabelText={`Condition Value - ${idx+1}`}
                                                    fieldClass="form-control"
                                                    areaLabel={`conditionValue${idx+1}`}
                                                    fieldPlaceholder="Enter value"
                                                    fieldValue={c.conditionValue}
                                                    onChange={e => onCondtionValueChange(e.target.value, idx)} />

                                            </div>
                                            {idx !== 0 &&
                                                <span className="cursor-pointer"
                                                    onClick={() => OnDecreaseGoalCondition(idx)}>
                                                    <TrashIcon
                                                        iconClass="ms-3 mb-2"
                                                        iconWidth="16"
                                                        iconHeight="16"
                                                        iconColor="#cc0000" />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    <div className="col-12 mb-4">
                        <ButtonComponent
                            buttonClass="btn btn-sm btn-white border border-primary"
                            buttonLabel="Add Goal"
                            onClick={OnIncreaseGoalCondition} /> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                            <SelectFieldComponent
                                isFieldLabelRequired="true"
                                fieldLabelClass="label text-dark"
                                fieldLabelText={`Time Period`}
                                fieldClass="form-select"
                                areaLabel={`Time Period`}
                                options={timePeriodOptions}
                                onChange={e => setGoalData({...goalData, timePeriod: e.target.value})} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="form-group mb-3">
                        <label className="w-100 label text-dark">Priority</label>
                            <RadioCheckboxComponent
                                labelClass="me-4"
                                fieldType="radio"
                                fieldLabel="Low"
                                ariaLabel="low"
                                fieldName="priority"
                                fieldValue={'Low'}
                                fieldChecked={goalData.priorityRadio === 'Low' ? true : false}
                                onChange={(e) => setGoalData({...goalData, priorityRadio: e.target.value})} />
                            <RadioCheckboxComponent
                                labelClass="me-4"
                                fieldType="radio"
                                fieldLabel="Medium"
                                ariaLabel="medium"
                                fieldName="priority"
                                fieldValue={'Medium'}
                                fieldChecked={goalData.priorityRadio === 'Medium' ? true : false}
                                onChange={(e) => setGoalData({...goalData, priorityRadio: e.target.value})} />
                            <RadioCheckboxComponent
                                labelClass=""
                                fieldType="radio"
                                fieldLabel="High"
                                ariaLabel="high"
                                fieldName="priority"
                                fieldValue={'High'}
                                fieldChecked={goalData.priorityRadio === 'High' ? true : false}
                                onChange={(e) => setGoalData({...goalData, priorityRadio: e.target.value})} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-end">
                        <ButtonComponent
                            buttonClass="btn btn-sm btn-primary"
                            buttonLabel="Submit"
                            onClick={SubmitData} /> 
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default AddGoalCreator;