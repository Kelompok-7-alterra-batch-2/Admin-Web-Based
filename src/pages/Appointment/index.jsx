import { Box, Typography } from '@mui/material'

import React, { useState ,useEffect} from 'react'

import { SearchBox, TableBox } from 'components'

import FilterListIcon from '@mui/icons-material/FilterList';

import axios from 'axios';

import { DefaultLayout , CustomFilter } from 'components';

import { toCapitalize } from 'helpers/function/toCapitalize';

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

const field = [
  {
      title : 'Patient',
      fieldname : 'patient',
      type : 'search'
  },
  {
      title : 'Department',
      fieldname : 'department',
  },
  {
      title : 'Appointment Date',
      fieldname : 'date',
      type : 'date'
  },
  {
      title : 'Appointment Time',
      fieldname : 'time',
      type : 'time'
  },
  {
      title : 'Doctor',
      fieldname : 'doctor',
  },
  {
      title : 'Appointment Reason',
      fieldname : 'reason',
      type : 'area',
      rows : 3
  }
]

const filterItem = [
  {
    title : 'All',
    value : 'all'
  },
  {
    title : 'General',
    value : 'general'
  },
  {
    title : 'Neurology',
    value : 'neurology'
  },
  {
    title : 'Cardiology',
    value : 'cardiology'
  },
  {
    title : 'Pediatric',
    value : 'pediatric'
  },
  {
    title : 'Gynecology',
    value : 'gynecology'
  }
]


export default function Appointment() {

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

  const [filterParam,setFilterParam] = useState('')

  const [dataFilter,setDataFilter] = useState(null)

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
          title : 'general',
          field : dataGeneral
        },
        {
          title : 'neurology',
          field : dataNeurology
        },
        {
          title : 'cardiology',
          field : dataCardiology
        },
        {
          title : 'pediatric',
          field : dataPediatric
        },
        {
          title : 'gynecology',
          field : dataGynecology
        }
      ])

      setIsLoading(false)

    }).catch(()=>{
      
    })

  },[])

    const handleChangeDepartment = (e) => {

      setFilterParam(e.target.value)

      if(e.target.value === 'all') {

        return setDataFilter(null)

      }
      
      return setDataFilter(data.filter(item=>item.title === e.target.value))
    
    }

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
            display : 'flex',
            gap : '30px',
            mt : '30px'
          }}
          >

            <FilterListIcon
            sx={{
              height : '32px',
              width : '32px',
              color : 'primary.main'   
            }}
            />

            <CustomFilter
            value={filterParam}
            onChange={handleChangeDepartment}
            placeholder='DEPARTMENT'
            filters={filterItem}
            sx={{
              width : '150px'
            }}
            />

          </Box>

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

            {!dataFilter && data.map((item,index)=>(

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
                {toCapitalize(item.title)} Department  
                </Typography>
                
                <TableBox
                dataHead={dataHead}
                dataBody={item.field}
                isLoading={isLoading}
                endPoint='appointment'
                fieldEdit={field}
                />

              </Box>

            ))}


            {dataFilter && dataFilter.map((item,index)=>(

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
              {toCapitalize(item.title)} Department  
              </Typography>
              
              <TableBox
              dataHead={dataHead}
              dataBody={item.field}
              isLoading={isLoading}
              endPoint='appointment'
              fieldEdit={field}
              />

            </Box>

            ))}

          </Box>

          <ModalConfirm
          isOpen={openConfirm}
          handleClose={()=>{setOpenConfirm(false)}}
          fieldInput={field}
          />

      </Box>

    </DefaultLayout>
  )
}