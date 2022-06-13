import { Box , Snackbar, Alert} from '@mui/material'

import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { SearchBox, TableBox , DefaultLayout , ModalInput } from 'components'

const field = [
  {
    title : 'Name',
    fieldname : 'name',
    type : 'text'
  },
  {
    title : 'Date of Birth',
    fieldname : 'dob',
    type : 'date'
  },
  {
    title : 'Gender',
    fieldname : 'gender',
    type : 'radio',
    option : [
      {
        title : 'Male',
        value : 'Male'
      },
      {
        title : 'Female',
        value : 'Female'
      }
    ]
  },
  {
    title : 'Phone Number',
    fieldname : 'phone_number',
    type : 'text'
  },
  {
    title : 'Blood Type',
    fieldname : 'blood_type',
    type : 'select',
    option : [
      {
        title : 'A',
        value : 'A',
      },
      {
        title : 'AB',
        value : 'AB'
      },
      {
        title : 'B',
        value : 'B'
      },
      {
        title : 'O',
        value : 'O'
      }
    ]
  },
  {
    title : 'City',
    fieldname : 'city',
    type : 'text'
  },
  {
    title : 'Address',
    fieldname : 'address',
    type : 'text'
  }
]

const initialData = {
  name : '',
  dob : '',
  gender : '',
  phone_number : '',
  blood_type : '',
  city : '',
  address : ''
}

export default function Patient() {

    const [data,setData] = useState(null)

    const [isLoading,setIsLoading] = useState(true)

    const [openModal,setOpenModal ] = useState({
      patient : false
    })

    const [searchPatient,setSearchPatient] = useState(null)

    const [isError,setIsError] = useState(false)

    const dataHead = [
      {
        headerName : 'Patient ID',
        fieldname : 'id'
      },
      {
        headerName : 'Name',
        fieldname : 'name'
      },
      {
        headerName : 'Date of Birth',
        fieldname : 'dob'
      },
      {
        headerName : 'Gender',
        fieldname : 'gender'
      },
      {
        headerName : 'Blood Type',
        fieldname : 'blood_type'
      },
      {
        headerName : 'Edit',
        fieldname : 'edit'
      }
    ]

    useEffect(()=>{

      axios({
        method : 'get',
        url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/patient',
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setData(res.data)
        setIsLoading(false)
      })

    },[])

    const handleOpenPatient = () => {

        setOpenModal((prev)=>{
          return {...prev,patient : !prev.patient}
        })

    }

    const onChangeSearch = (e) => {

        setSearchPatient(e.target.value)

    }

    const handleSearch = () => {

      axios({
        method : 'get',
        url : `https://62a18758cc8c0118ef4d691f.mockapi.io/patient?search=${searchPatient}`,
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
          labelLeftButton='Add New Patient'
          onClickLeftButton={handleOpenPatient}
          placeholder='Search patient here...'
          onChangeSearch={onChangeSearch}
          onClickSearch={handleSearch}
          />

          <ModalInput
          isOpen={openModal.patient}
          handleClose={handleOpenPatient}
          field={field}
          initialData={initialData}
          title='New Patient'
          endPoint='patient'
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
              endPoint='patient'
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
