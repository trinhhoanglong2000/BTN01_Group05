import React, { useEffect, useState, forwardRef } from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { DrawerAdmin as Drawer } from "./Drawer";
import { CheckAdmin, getAllClassAdmin,adminUpdateClass } from "../../api";
import LinearProgress from "@mui/material/LinearProgress";

import MaterialTable from "material-table";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import moment from "moment";

const drawerWidth = 200;
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutlineIcon {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownwardIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
};
export const AdminPageClass = () => {
  const [tableData, setTableData] = useState([
    {
      id: "Test",
      name: "HEHE",
      section: "Test@gmail.com",
      room: "HEHE",

      subject: "HEHE",

    },
  ]);
  const columns = [
    {
      title: "Id",
      field: "id",
      emptyValue: () => <em></em>,
      editable: 'never'
    },
    {
      title: "Name",
      field: "name",
      emptyValue: () => <em></em>,
    },
    { title: "Section", field: "section", emptyValue: () => <em></em> },
    {
      title: "Subject",
      field: "subject",
      emptyValue: () => <em></em>,
   
    },

    {
      title: "Room",
      field: "room",
      emptyValue: ()=><em></em>,

    },


  ];
  const [auth, setAuth] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => GetData(), []);
  const GetData = async () => {
    let data = {};
    let classes = {};
    try {
      data = await CheckAdmin();
      classes = await getAllClassAdmin();
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      if (data.data == false) {
        setAuth(false);
      } else {
        setIsAuth(true);
      }
    } else {
      if (data.message === "jwt expired") {
        localStorage.clear();
      }
      setAuth(false);
    }
    if (classes.success) {
      
      setTableData(classes.data);
    }
  };

  return (
    <>
      {!auth && <Navigate to="/" />}
      {!isAuth && <LinearProgress />}
      {isAuth && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            <Toolbar sx={{ background: "#9DC183" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "black" }}
              >
                Accounts
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />

            <MaterialTable
              columns={columns}
              data={tableData}
              editable={{
                onRowUpdate: (newRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const updatedData = [...tableData];
                    updatedData[oldRow.tableData.id] = newRow;

                    setTableData(updatedData);
                    
                    //update on data
                    adminUpdateClass(
                      
                      newRow.id,
                      newRow.name,
                      newRow.subject,
                      newRow.section,
                      newRow.room,
                 
                    ).then(() => resolve());
                  }),

              }}
     
              onSelectionChange={(selectedRows) => console.log(selectedRows)}
              
              options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                filtering: true,
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: 5,
                paginationType: "stepped",
                showFirstLastPageButtons: true,
                paginationPosition: "both",
                exportButton: true,
                exportAllData: true,
                exportFileName: "TableData",
                addRowPosition: "first",
                actionsColumnIndex: -1,
                selection: false,
                showSelectAllCheckbox: false,
                showTextRowsSelected: false,

                grouping: true,
                columnsButton: true,
              }}
              title="Student Information"
              icons={{ ...tableIcons, Add: () => <AddIcon /> }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
