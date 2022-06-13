import React from "react";

// MUI
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { SearchBox, TableBox } from "components";
import { FilterList } from "@mui/icons-material";

const status = ["Pending", "Confirmed", "Cancelled"];
const department = [
  "Cardiology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Radiology",
];

const dataHead = [
  {
    headerName: "Department",
    fieldname: "department",
  },
  {
    headerName: "Name",
    fieldname: "name",
  },
  {
    headerName: "Phone",
    fieldname: "phone",
  },
  {
    headerName: "Status",
    fieldname: "status",
  },
  {
    headerName: "Edit",
    fieldname: "edit",
  },
];

const dataBody = [
  {
    department: "Neurology",
    name: "Dami Sarah",
    phone: "081928364756",
    status: "Active",
  },
  {
    department: "Neurology",
    name: "Dami Sarah",
    phone: "081928364756",
    status: "Active",
  },
  {
    department: "Neurology",
    name: "Dami Sarah",
    phone: "081928364756",
    status: "Active",
  },
];

const Doctor = () => {
  const handleOpenModal = () => {
    console.log("open modal");
  };

  const onChangeSearch = (e) => {
    console.log(e.target.value);
  };

  const handleSearch = () => {
    console.log("click");
  };
  return (
    <Box>
      <SearchBox
        labelLeftButton="Add New Doctor"
        onClickLeftButton={handleOpenModal}
        placeholder="Search doctor here..."
        onChangeSearch={onChangeSearch}
        onClickSearch={handleSearch}
      />

      <Grid container spacing={1} mt={2}>
        <Grid item xs={1}>
          <FilterList
            color="primary"
            sx={{ fontSize: "40px", padding: "10px", cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={status}
            sx={{ width: "100%", height: "auto" }}
            renderInput={(params) => <TextField {...params} label="STATUS" />}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={department}
            sx={{ width: "100%", height: "auto" }}
            renderInput={(params) => (
              <TextField {...params} label="DEPARTEMENT" />
            )}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <TableBox dataHead={dataHead} dataBody={dataBody} />
      </Box>
    </Box>
  );
};

export default Doctor;
