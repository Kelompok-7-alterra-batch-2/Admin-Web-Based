import { Box , Snackbar, Alert} from '@mui/material'

import React, { useEffect, useState } from 'react'

import axios from 'axios';

import FilterListIcon from '@mui/icons-material/FilterList';

import { SearchBox, TableBox , DefaultLayout , ModalInput , CustomFilter } from 'components'

const field = [
  {
    title : 'Doctor Name',
    fieldname : 'name',
    type : 'text'
  },
  {
    title : 'NID',
    fieldname : 'nid',
    type : 'text'
  },
  {
    title : 'Department',
    fieldname : 'department',
    type : 'select',
    option : [
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
      },
    ]
  },
  {
    title : 'Email',
    fieldname : 'email',
    type : 'email'
  },
  {
    title : 'Password',
    fieldname : 'password',
    type : 'password'
  },
  {
    title : 'Phone Number',
    fieldname : 'phone_number',
    type : 'text'
  }
]

const initialData = {
  name : '',
  nid : '',
  department : '',
  email : '',
  password : '',
  phone_number : '',
}

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

const dataHead = [
  {
    headerName : 'NID',
    fieldname : 'id'
  },
  {
    headerName : 'Department',
    fieldname : 'department'
  },
  {
    headerName : 'Doctor Name',
    fieldname : 'name'
  },
  {
    headerName : 'Phone Number',
    fieldname : 'phone_number'
  },
  {
    headerName : 'Edit',
    fieldname : 'edit'
  }
]


export default function Doctor() {

    const [data,setData] = useState(null)

    const [isLoading,setIsLoading] = useState(true)

    const [openModal,setOpenModal ] = useState({
      doctor : false
    })

    const [searchDoctor,setSearchDoctor] = useState(null)

    const [isError,setIsError] = useState(false)

    const [filterParam,setFilterParam] = useState('')

    const [dataFilter,setDataFilter] = useState(null)

    useEffect(()=>{

      axios({
        method : 'get',
        url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/doctor',
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setData(res.data)
        setIsLoading(false)
      }).catch(()=>{

      })

    },[])

    const handleChangeDepartment = async(e) => {

      setFilterParam(e.target.value)
      
      if(e.target.value === 'all') {
        
        return setDataFilter(null)
        
      }
      
      setIsLoading(true)

      await axios({
        method : 'get',
        url : `https://62a18758cc8c0118ef4d691f.mockapi.io/doctor?filter=${e.target.value}`,
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setDataFilter(res.data)
      }).catch(()=>{
        setIsError(true)
      })
      setIsLoading(false)
    
    }

    const handleOpenDoctor = () => {

        setOpenModal((prev)=>{
          return {...prev, doctor : !prev.doctor}
        })

    }

    const onChangeSearch = (e) => {

        setSearchDoctor(e.target.value)

    }

    const handleSearch = async() => {

      setIsLoading(true)
      await axios({
        method : 'get',
        url : `https://62a18758cc8c0118ef4d691f.mockapi.io/doctor?search=${searchDoctor}`,
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setData(res.data)
      }).catch(()=>{
        setIsError(true)
      })
      setIsLoading(false)

    }

  return (

    <DefaultLayout>

      <Box>

          <SearchBox 
          labelLeftButton='Add New Doctor'
          onClickLeftButton={handleOpenDoctor}
          placeholder='Search doctor here...'
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
              width : '175px'
            }}
            />

          </Box>

          <ModalInput
          isOpen={openModal.doctor}
          handleClose={handleOpenDoctor}
          field={field}
          initialData={initialData}
          title='New Doctor'
          endPoint='doctor'
          methodSubmit='post'
          />

          <Box
          sx={{
            marginTop : '30px'
          }}
          >
              {!dataFilter &&
              <TableBox
              dataHead={dataHead}
              dataBody={data}
              isLoading={isLoading}
              endPoint='doctor'
              fieldEdit={field}
              />}

              {dataFilter &&
              <TableBox
              dataHead={dataHead}
              dataBody={dataFilter}
              endPoint='doctor'
              fieldEdit={field}
              isLoading={isLoading}
              />
              }  

          </Box>

          <Snackbar
          anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
          open={isError}
          onClose={()=>setIsError(false)}
          autoHideDuration={3000}
          >
              <Alert severity='error'>
                  Sorry, can't find your search, please try another again
              </Alert>

          </Snackbar>

      </Box>

    </DefaultLayout>
  
  )
}
