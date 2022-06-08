import { Box } from '@mui/material'

import React from 'react'

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
  }
]

export default function Patient() {

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
         labelLeftButton='Add New Patient'
         onClickLeftButton={handleOpenModal}
         placeholder='Search patient here...'
         onChangeSearch={onChangeSearch}
         onClickSearch={handleSearch}
         />

         <Box
         sx={{
           marginTop : '30px'
         }}
         >
           
            <TableBox
            dataHead={dataHead}
            dataBody={dataBody}
            />  

         </Box> 

    </Box>
  )
}