import React from "react";
import { CSVDownload, CSVLink } from "react-csv";

const converter = (data, columns) => {
  const csvData = [];
  csvData.push(columns.map((el) => el.headerName));
  data &&
    data.forEach((elem) => {
      const temp = [];
      columns.forEach((el) => {
        temp.push(elem[el.field]);
      });
      csvData.push(temp);
    });
  return csvData;
};

const style={
    backgroundColor:"#3f51b5",
    border:"none",
    color:"white",
    padding:"10px 25px",
    textAlign:"center",
    textDecoration:"none",
    display:"inline-block",
    fontSize:"16px",
    marginTop:"10px",
    borderRadius:"6px",
    
}

export default ({ incidents, columns }) => (
  <CSVLink data={converter(incidents, columns)} filename="disasterData.csv" target="_blank" style={style}>Export</CSVLink>
);
