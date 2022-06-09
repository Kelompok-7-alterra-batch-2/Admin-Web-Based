import { Box } from "@mui/material";

import React from "react";

import { SearchBox, TableBox } from "components";

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
