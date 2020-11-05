import "./App.css";
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject,
    Edit,
    Toolbar,
    Filter,
    Sort,
} from "@syncfusion/ej2-react-grids";
import data from "./disaster_data.json";

import DialogForm from "./dialogForm";
import { SelectionSettings } from "@syncfusion/ej2-react-dropdowns";

function App() {
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
        template: dialogTemplate,
    };
    const toolbarOptions = ["Add", "Edit", "Delete"];

    const filterOptions = {
        ignoreAccent: true,
        type: "Menu",
    };

    const selectionOptions = {
        type: "Multiple",
    };

    function dialogTemplate(props) {
        return <DialogForm {...props} />;
    }
    return (
        <div style={{ margin: "10%", marginTop: "5%" }}>
            <GridComponent
                dataSource={data}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                allowFiltering
                filterSettings={filterOptions}
                allowSorting
                allowSelection
                selectionSettings={selectionOptions}
            >
                <ColumnsDirective>
                    <ColumnDirective
                        field="IncidentDate"
                        type="Date"
                        editType="datepickeredit"
                        format="yMd"
                        edit={false}
                    />
                    <ColumnDirective
                        field="District"
                        editType="dropdownedit"
                        filter={{ type: "Checkbox" }}
                    />
                    <ColumnDirective
                        field="Incident"
                        editType="dropdownedit"
                        filter={{ type: "CheckBox" }}
                    />
                    <ColumnDirective field="TotalDeath" />
                    <ColumnDirective field="MissingPeople" />
                    {/* <ColumnDirective field="AffectedFamily" />
                    <ColumnDirective field="EstimatedLoss" /> */}
                    <ColumnDirective field="Injured" />
                    <ColumnDirective field="HousesDamaged" />
                </ColumnsDirective>
                <Inject services={[Page, Edit, Toolbar, Filter, Sort]} />
            </GridComponent>
        </div>
    );
}

export default App;
