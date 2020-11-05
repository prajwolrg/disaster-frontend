import React, { useState } from "react";
import {
    TextBoxComponent,
    NumericTextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

// import { DataUtil } from "@syncfusion/ej2-data";

const DialogForm = (props) => {
    console.log(props);
    const [visibility, setVisibility] = useState(["none", "none", "none"]);

    const handleChange = (...data) => {
        const disaster = data[0].value;
        if (disaster === "Flood") {
            setVisibility(["initial", "none", "none"]);
        } else if (disaster === "Fire") {
            setVisibility(["none", "initial", "none"]);
        } else if (disaster === "Earthquake") {
            setVisibility(["none", "none", "initial"]);
        }
        console.log(disaster);
    };

    const DisasterType = [
        { key: 0, name: "Flood" },
        { key: 1, name: "Fire" },
        { key: 2, name: "Earthquake" },
    ];
    return (
        <div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <DatePickerComponent
                        id="IncidentDate"
                        value={props.IncidentDate}
                        disabled={!props.isAdd}
                        placeholder="Incident Date"
                        floatLabelType="Auto"
                    />
                </div>
                <div className="form-group col-md-6">
                    <TextBoxComponent
                        id="District"
                        value={props.District}
                        placeholder="District"
                        floatLabelType="Always"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <DropDownListComponent
                        id="Incident"
                        value={props.Incident}
                        dataSource={DisasterType}
                        fields={{ text: "name", value: "name" }}
                        placeholder="Disaster Type"
                        popupHeight="300px"
                        floatLabelType="Always"
                        change={handleChange}
                    />
                </div>
            </div>
            <div className="form-row" style={{ display: visibility[0] }}>
                <div className="form-group col-md-6">
                    <TextBoxComponent
                        id="Origin"
                        value={props.Origin}
                        disabled={!props.isAdd}
                        placeholder="Origin"
                        floatLabelType="Auto"
                    />
                </div>
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="Height"
                        value={props.Height}
                        placeholder="Height"
                        floatLabelType="Auto"
                    />
                </div>
            </div>
            <div className="form-row" style={{ display: visibility[1] }}>
                <div className="form-group col-md-12">
                    <TextBoxComponent
                        id="Cause"
                        value={props.Cause}
                        placeholder="Origin"
                        floatLabelType="Auto"
                    />
                </div>
            </div>
            <div className="form-row" style={{ display: visibility[2] }}>
                <div className="form-group col-md-6">
                    <TextBoxComponent
                        id="Epicenter"
                        value={props.Epicenter}
                        placeholder="Origin"
                        floatLabelType="Auto"
                    />
                </div>
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="RichterMagnitude"
                        value={props.RichterMagnited}
                        placeholder="Richter"
                        floatLabelType="Auto"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="TotalDeath"
                        value={props.TotalDeath}
                        floatLabelType="Auto"
                        placeholder="Total Death"
                    />
                </div>
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="MissingPeople"
                        value={props.MissingPeople}
                        floatLabelType="Auto"
                        placeholder="Missing People"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="Injured"
                        value={props.Injured}
                        floatLabelType="Auto"
                        placeholder="Injured"
                    />
                </div>
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="AffectedFamily"
                        value={props.AffectedFamily}
                        floatLabelType="Auto"
                        placeholder="Affected Family"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="HousesDamaged"
                        value={props.HousesDamaged}
                        floatLabelType="Auto"
                        placeholder="Houses Damaged"
                    />
                </div>
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent
                        id="EstimatedLoss"
                        value={props.EstimatedLoss}
                        floatLabelType="Auto"
                        placeholder="Estimated Loss"
                    />
                </div>
            </div>
        </div>
    );
};

export default DialogForm;
