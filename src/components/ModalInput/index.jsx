import React, { useState } from 'react'

import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { fetchFilter } from 'api/get'

import { updateData } from 'api/put'

import { postData } from 'api/post'

import { CustomInput } from 'components'

import ModalSuccess from './components/ModalSuccess'
import DepartmentInput from './components/DepartmentInput'
import DoctorInput from './components/DoctorInput'
import SearchInput from './components/SearchInput'
import SelectModalInput from './components/SelectInput'
import RadioModalInput from './components/RadioModalInput'

export default function ModalInput(props) {
  const {
    isOpen,
    handleClose,
    field,
    initialData,
    title,
    endPoint,
    methodSubmit,
  } = props

  const initialError = {
    submit: false,
    selectDoctor: false,
  }

  const [form, setForm] = useState(initialData)

  const [isSuccess, setIsSuccess] = useState(false)

  const [isError, setIsError] = useState(initialError)

  const [isLoading, setIsLoading] = useState(false)

  const [listDoctor, setListDoctor] = useState(null)

  const handleCloseModal = () => {
    handleClose()
    setForm(initialData)
  }

  const handleChange = (e) => {
    if (e.target.value === '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    }
    if (e.target.value !== '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleChangeDepartment = async (e) => {
    if (e.target.value === '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    }
    if (e.target.value !== '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }
    const { data, error } = await fetchFilter('doctor', e.target.value)

    if (data) {
      setListDoctor(data)

      setForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        }
      })
    }
    setIsError((prev) => {
      return { ...prev, selectDoctor: error }
    })
  }

  const handleSubmit = async () => {
    let paramError
    for (let i = 0; i < field.length; i++) {
      if (form[field[i].fieldname] === '') {
        paramError = true
        setIsError((prev) => {
          return { ...prev, [field[i].fieldname]: true }
        })
      }
      if (form[field[i].fieldname] !== '') {
        setIsError((prev) => {
          return { ...prev, [field[i].fieldname]: false }
        })
      }
    }

    if (!paramError) {
      let result
      if (methodSubmit === 'post') {
        const { error } = postData(endPoint, form)
        result = error
      }
      if (methodSubmit === 'put') {
        const { error } = updateData(endPoint, form.id, form)
        result = error
      }

      if (result) {
        return setIsError((prev) => {
          return { ...prev, submit: true }
        })
      }

      setIsSuccess((prev) => {
        return !prev
      })
    }
  }

  return (
    <>
      <Modal
        aria-labelledby='modal-input-title'
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 472,
              bgcolor: 'white',
              boxShadow: 24,
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                p: '30px 30px 0 30px',
              }}
            >
              <IconButton
                onClick={handleCloseModal}
                aria-label='close-modal'
                sx={{
                  right: '0',
                  position: 'absolute',
                  transform: 'translate(-50%,-15%)',
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                id='modal-input-title'
                sx={{
                  marginBottom: '30px',
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                rowGap: '30px',
                maxHeight: '400px',
                overflowY: 'scroll',
                px: '30px',
              }}
            >
              {field.map((item, index) => {
                if (item.type === 'search') {
                  return (
                    <Box key={index}>
                      <SearchInput
                        onChange={handleChange}
                        value={form[item.fieldname]}
                        item={item}
                        error={isError[item.fieldname]}
                        onSubmit={(e) =>
                          setForm((prev) => {
                            return { ...prev, [item.fieldname]: e }
                          })
                        }
                      />
                    </Box>
                  )
                }

                if (item.fieldname === 'department') {
                  return (
                    <Box key={index}>
                      <DepartmentInput
                        onChange={handleChangeDepartment}
                        value={form[item.fieldname]}
                        item={item}
                        error={
                          isError.selectDoctor ||
                          (listDoctor && listDoctor.length === 0)
                        }
                        errorEmpty={isError[item.fieldname]}
                      />
                    </Box>
                  )
                }

                if (item.fieldname === 'doctor') {
                  return (
                    <Box key={index}>
                      <DoctorInput
                        onChange={handleChange}
                        value={form[item.fieldname]}
                        item={item}
                        initialData={initialData}
                        list={listDoctor}
                        error={isError[item.fieldname]}
                      />
                    </Box>
                  )
                }

                if (item.type === 'area') {
                  return (
                    <Box key={index}>
                      <CustomInput
                        value={form[item.fieldname]}
                        name={item.fieldname}
                        label={item.title}
                        onChange={handleChange}
                        type={item.type}
                        multiline={true}
                        rows={item.rows}
                        isError={isError[item.fieldname]}
                        errorMessage={`Field ${item.title} is empty`}
                      />
                    </Box>
                  )
                }

                if (item.type === 'select') {
                  return (
                    <Box key={index}>
                      <SelectModalInput
                        onChange={handleChange}
                        value={form[item.fieldname]}
                        item={item}
                        error={isError[item.fieldname]}
                      />
                    </Box>
                  )
                }

                if (item.type === 'radio') {
                  return (
                    <Box key={index}>
                      <RadioModalInput
                        onChange={handleChange}
                        value={form[item.fieldname]}
                        item={item}
                        error={isError[item.fieldname]}
                      />
                    </Box>
                  )
                }

                return (
                  <Box key={index}>
                    <CustomInput
                      value={form[item.fieldname]}
                      name={item.fieldname}
                      label={item.title}
                      onChange={handleChange}
                      type={item.type}
                      multiline={false}
                      isError={isError[item.fieldname]}
                      errorMessage={`Field ${item.title} is empty`}
                    />
                  </Box>
                )
              })}
            </Box>

            <Box
              px={{
                padding: '30px',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Button
                  disabled={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                  fullWidth
                >
                  Submit
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <ModalSuccess
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
        descTitle={title}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isError.submit}
        onClose={() => setIsError(false)}
        autoHideDuration={3000}
      >
        <Alert severity='error'>Sorry, error</Alert>
      </Snackbar>
    </>
  )
}
