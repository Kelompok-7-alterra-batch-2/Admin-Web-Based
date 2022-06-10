import { Box , Snackbar, Alert} from '@mui/material'

import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { SearchBox, TableBox , DefaultLayout } from 'components'

import ModalAddPatient from './components/ModalAddPatient'


export default function Patient() {

    const [data,setData] = useState(null)

    const [user,setUser] = useState(null)

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
        url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/user/2',
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setUser(res.data)
      })

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
        url : `https://62a18758cc8c0118ef4d691f.mockapi.io/patient/${searchPatient}`,
        data : {},
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then((res)=>{
        setData([res.data])
      }).catch(()=>{
        setIsError(true)
      })

    }

  return (

    <DefaultLayout
    user={user}
    isLoading={isLoading}
    >

      <Box>

          <SearchBox 
          labelLeftButton='Add New Patient'
          onClickLeftButton={handleOpenPatient}
          placeholder='Search patient here...'
          onChangeSearch={onChangeSearch}
          onClickSearch={handleSearch}
          />

          <ModalAddPatient
          isOpen={openModal.patient}
          handleClose={handleOpenPatient}
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
