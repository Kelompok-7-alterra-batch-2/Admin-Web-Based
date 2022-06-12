import { Box, Grid, Autocomplete, TextField, Typography, Link, InputAdornment, TablePagination } from '@mui/material'
import React, { useState ,useEffect} from 'react'
// import { FilterList , ChevronRight } from '@mui/icons-material';
import { SearchBox, TableBox } from 'components'

import axios from 'axios';

import { DefaultLayout } from 'components';

import ModalConfirm from './components/ModalConfirm';

const dataHead = [
  {
    headerName : 'Queue',
    fieldname : 'queue'
  },
  {
    headerName : 'Time',
    fieldname : 'time'
  },
  {
    headerName : 'Patient',
    fieldname : 'patient'
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

export default function Appointment() {

  // const [page, setPage] = useState(1);

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data,setData] = useState([
    {
      title : 'General',
      field : []
    },
    {
      title : 'Neurology',
      field : []
    },
    {
      title : 'Cardiology',
      field : []
    },
    {
      title : 'Pediatric',
      field : []
    },
    {
      title : 'Gynecology',
      field : []
    }
  ])  

  const [isLoading,setIsLoading] = useState(true)
  
  const [openConfirm ,setOpenConfirm] = useState(false)

  useEffect(()=>{

    axios({
      method : 'get',
      url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/appointment',
      data : {},
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then((res)=>{

      const dataNeurology = res.data.filter(item => item.department === 'neurology')

      const dataGeneral = res.data.filter(item => item.department === 'general')

      const dataCardiology = res.data.filter(item => item.department === 'cardiology')

      const dataPediatric = res.data.filter(item => item.department === 'pediatric')

      const dataGynecology = res.data.filter(item => item.department === 'gynecology')

      setData([
        {
          title : 'General',
          field : dataGeneral
        },
        {
          title : 'Neurology',
          field : dataNeurology
        },
        {
          title : 'Cardiology',
          field : dataCardiology
        },
        {
          title : 'Pediatric',
          field : dataPediatric
        },
        {
          title : 'Gynecology',
          field : dataGynecology
        }
      ])

      setIsLoading(false)

    })

  },[])

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 1));
  //   setPage(0);
  // };

    const handleOpenModal = () => {

        setOpenConfirm(true)

    }

    const onChangeSearch = (e) => {

        console.log(e.target.value)

    }

    const handleSearch = () => {

        console.log("click")

    }

  return (

    <DefaultLayout>

      <Box
      sx={{
        mb : '30px'
      }}
      >

          <SearchBox 
          labelLeftButton='Add new appointment'
          onClickLeftButton={handleOpenModal}
          placeholder='Search here...'
          onChangeSearch={onChangeSearch}
          onClickSearch={handleSearch}
          />

          <Box
          sx={{
            marginTop : '30px',
            display : 'flex',
            flexDirection : 'column',
            rowGap : '30px'
          }}
          > 

            <Typography
            variant='h2'
            >
              Today Appointment
            </Typography>

            {data.map((item,index)=>(

              <Box
              key={index}
              sx={{
                display : 'flex',
                flexDirection : 'column',
                rowGap : '30px'
              }}
              >

                <Typography
                variant='h3'
                sx={{
                  textAlign : 'center'
                }}
                >
                {item.title} Department  
                </Typography>
                
                <TableBox
                dataHead={dataHead}
                dataBody={item.field}
                isLoading={isLoading}
                endPoint='appointment'
                />

              </Box>

            ))}

          </Box> 

        {/* <TablePagination
          component="div"
          count={13}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}


          <ModalConfirm
          isOpen={openConfirm}
          handleClose={()=>{setOpenConfirm(false)}}
          />

      </Box>

    </DefaultLayout>
  )
}