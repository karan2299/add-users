import "./App.css";
import TextField from "@mui/material/TextField";
import { color } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
function App() {
  const styles = {
    floatingLabelFocusStyle: {
      color: "red",
    },
  };
  function createData(name, email, location) {
    const d = new Date();
    const date = d.toLocaleDateString("en-US");
    return { name, email, location, date };
  }

  // const rows = [
  //     createData(1, "Apple", 5, 3),
  //     createData(2, "Orange", 2, 2),
  //     createData(3, "Grapes", 3, 1),
  //     createData(4, "Tomato", 2, 1.6),
  //     createData(5, "Mango", 1.5, 4)
  // ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [tableData, setTableData] = useState([]);
  const addUsers = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || location === "") {
      console.log("error-no-data");
    } else {
      tableData.push(createData(name, email, location));
      setName("");
      setEmail("");
      setLocation("");
    }
    // console.log('test', createData('name', 'email', 'location'))
  };

  const exportToCSV = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${new Date()}` + fileExtension);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="head-tag">Add Users</p>
        <div className="input-group">
          <TextField
              required={true}
            id="standard-basic"
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            label="Name"
            variant="standard"
            color="primary"
            className="input-field"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            variant="standard"
            className="input-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            label="Location"
            variant="standard"
            className="input-field"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <div className="add-user" style={{}}>
            <Button
              variant="outlined"
              className="add-userb"
              sx={{
                borderRadius: 50,
                // background: "white"
              }}
              onClick={addUsers}
            >
              ADD USER
            </Button>
          </div>
        </div>

        <div className="add-user" style={{ width: "55%" }}>
          {tableData && tableData.length > 0 ? (
            <Button
              variant="outlined"
              className=""
              sx={{
                borderRadius: 50,
                // background: "white"
              }}
              onClick={exportToCSV}
            >
              EXPORT CSV
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="table-div">
          {tableData && tableData.length > 0 ?   <TableContainer component={Paper} style={{ width: "60%" }}>
            <Table
                aria-label="simple table"
                id="table-to-xls"
                style={{ "background-color": "" }}
            >
              <TableHead>
                <TableRow
                    sx={{
                      backgroundColor: "#282c34",
                      border: "3px solid white",
                      "& th": {
                        fontSize: "1.25rem",
                        color: "white",
                      },
                    }}
                    className="neon"
                >
                  <TableCell>S.No</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">CreatedAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                  sx={{
                    backgroundColor: "#282c34",
                    border: "2px solid white",
                    "& th": {
                      fontSize: "1.25rem",
                      color: "white",
                      textAlign: "center",
                    },
                  }}
              >
                {tableData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell
                          align="right"
                          sx={{
                            backgroundColor: "#282c34",
                            // border: "2px solid white",
                            fontSize: "1.25rem",
                            color: "white",
                          }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                          align="right"
                          sx={{
                            backgroundColor: "#282c34",
                            // border: "2px solid white",
                            fontSize: "1.25rem",
                            color: "white",
                          }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                          align="right"
                          sx={{
                            backgroundColor: "#282c34",
                            // border: "2px solid white",
                            fontSize: "1.25rem",
                            color: "white",
                          }}
                      >
                        {row.location}
                      </TableCell>
                      <TableCell
                          align="right"
                          sx={{
                            backgroundColor: "#282c34",
                            // border: "2px solid white",
                            fontSize: "1.25rem",
                            color: "white",
                          }}
                      >
                        {row.date}
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : ''}

        </div>
      </header>
    </div>
  );
}

export default App;
