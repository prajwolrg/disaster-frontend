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
// import data from "./disaster_data.json";

import DialogForm from "./dialogForm";
import { SelectionSettings } from "@syncfusion/ej2-react-dropdowns";

import { getIncidents } from "./service";
import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        console.log("useEffect");
        getIncidents().then((data) => {
            setData(data);
            console.log(data);
        });
    }, []);

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
                <Inject services={[Page, Edit, Toolbar, Filter, Sort]} />
            </GridComponent>
        </div>
    );
}

export default App;
