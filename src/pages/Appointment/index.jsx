import { Box, Grid, Autocomplete, TextField, Typography, Link, InputAdornment, TablePagination } from '@mui/material'
import React, { useState } from 'react'
import { FilterList , ChevronRight } from '@mui/icons-material';
import { SearchBox, TableBox } from 'components'

const dataHead = [
  {
    headerName : 'Time',
    fieldname : 'time'
  },
  {
    headerName : 'Date',
    fieldname : 'date'
  },
  {
    headerName : 'Patient',
    fieldname : 'patient'
  },
  {
    headerName : 'Department',
    fieldname : 'department'
  },
  {
    headerName : 'Doctor',
    fieldname : 'doctor'
  },
  {
    headerName : 'Status',
    fieldname : 'status'
  },
  {
    headerName : 'Edit',
    fieldname : 'edit'
  }
]

const status = ["Pending", "Confirmed", "Cancelled"]
const department = ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Radiology"]


const dataBody = [
  {
      time : '07.00',
      date : '02-05-2022',
      patient : 'Wanda Scarlett',
      department : 'Neurology',
      doctor : 'Dr.Mantis Rachel',
      status : 'pending'
  },
  {
      time : '07.00',
      date : '02-05-2022',
      patient : 'Wanda Scarlett',
      department : 'Neurology',
      doctor : 'Dr.Mantis Rachel',
      status : 'pending'
  },
  {
      time : '07.00',
      date : '02-05-2022',
      patient : 'Wanda Scarlett',
      department : 'Neurology',
      doctor : 'Dr.Mantis Rachel',
      status : 'pending'
  },
  {
      time : '07.00',
      date : '02-05-2022',
      patient : 'Wanda Scarlett',
      department : 'Neurology',
      doctor : 'Dr.Mantis Rachel',
      status : 'process'
  },
  {
    time : '07.00',
    date : '02-05-2022',
    patient : 'Wanda Scarlett',
    department : 'Neurology',
    doctor : 'Dr.Mantis Rachel',
    status : 'pending'
  },
  {
    time : '07.00',
    date : '02-05-2022',
    patient : 'Wanda Scarlett',
    department : 'Neurology',
    doctor : 'Dr.Mantis Rachel',
    status : 'pending'
  },
  {
    time : '07.00',
    date : '02-05-2022',
    patient : 'Wanda Scarlett',
    department : 'Neurology',
    doctor : 'Dr.Mantis Rachel',
    status : 'pending'
  },
  {
    time : '07.00',
    date : '02-05-2022',
    patient : 'Wanda Scarlett',
    department : 'Neurology',
    doctor : 'Dr.Mantis Rachel',
    status : 'process'
  }
]

export default function Appointment() {

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 1));
    setPage(0);
  };

    const handleOpenModal = () => {

        console.log("open modal")

    }

    const onChangeSearch = (e) => {

        console.log(e.target.value)

    }

    const handleSearch = () => {

        console.log("click")

    }

  return (
    <Box>

         <SearchBox 
         labelLeftButton='Add new appointment'
         onClickLeftButton={handleOpenModal}
         placeholder='Search here...'
         onChangeSearch={onChangeSearch}
         onClickSearch={handleSearch}
         />
        <Grid container spacing={1} mt={2}>
            <Grid item xs={1}>
              <FilterList 
                color='primary'
                sx={{ fontSize: '40px', padding: '10px', cursor: 'pointer' }}
                
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={status}
                sx={{ width: '100%', height: "auto" }}
                renderInput={(params) => <TextField {...params} label="STATUS" />}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={department}
                sx={{ width: '100%', height: "auto"}}
                renderInput={(params) => <TextField {...params} label="DEPARTEMENT"/>}
              />
            </Grid>
          </Grid>
         <Box
         sx={{
           marginTop : '30px'
         }}
         >
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <Typography variant='h3'mb={3}>
                Appointment Today
              </Typography>
            </Grid>
            <Grid item xs={1} >
              <Link 
              href='#' 
              underline="none" 
              color="neutral600"
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                  <ChevronRight color="neutral600"/>
                </InputAdornment>
              }}>
                See more
              </Link>
            </Grid>
          </Grid>
            <TableBox
            dataHead={dataHead}
            dataBody={dataBody}
            />
          
          

         </Box> 
      <TablePagination
        component="div"
        count={13}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Box>
  )
}