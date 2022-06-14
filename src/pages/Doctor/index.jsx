import { Box , Snackbar, Alert} from '@mui/material'

import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { SearchBox, TableBox , DefaultLayout , ModalInput } from 'components'

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

export default function Doctor() {

    const [data,setData] = useState(null)

    const [isLoading,setIsLoading] = useState(true)

    const [openModal,setOpenModal ] = useState({
      doctor : false
    })

    const [searchDoctor,setSearchDoctor] = useState(null)

    const [isError,setIsError] = useState(false)

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
      })

    },[])

    const handleOpenDoctor = () => {

        setOpenModal((prev)=>{
          return {...prev, doctor : !prev.patient}
        })

    }

    const onChangeSearch = (e) => {

        setSearchDoctor(e.target.value)

    }

    const handleSearch = () => {

      axios({
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
            
              <TableBox
              dataHead={dataHead}
              dataBody={data}
              isLoading={isLoading}
              endPoint='doctor'
              fieldEdit={field}
              />  

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
