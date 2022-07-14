import { useState } from 'react'

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

import { fetchData } from '@/api/get'

import { updateData } from '@/api/put'

import { postData } from '@/api/post'

import { CustomInput, CustomDateInput } from '@/components'

import ModalSuccess from './components/ModalSuccess'
import DepartmentInput from './components/DepartmentInput'
import DoctorInput from './components/DoctorInput'
import SearchInput from './components/SearchInput'
import SelectModalInput from './components/SelectInput'
import RadioModalInput from './components/RadioModalInput'
import SelectWithApi from './components/SelectWithApi'
import RadioWithApi from './components/RadioWithApi'
import ArrivalInput from './components/ArrivalInput'

import { useQueryClient } from 'react-query'
import moment from 'moment'

export default function ModalInput(props) {
  const {
    isOpen,
    handleClose,
    field,
    initialData,
    title,
    endPoint,
    methodSubmit,
    queryKey,
    editParam,
  } = props
  const initialError = {
    submit: false,
    selectDoctor: false,
  }
  let updateForm = {}
  if (
    initialData.outpatientCondition &&
    initialData.outpatientCondition !== undefined
  ) {
    updateForm = {
      ...updateForm,
      outpatientCondition_id: initialData.outpatientCondition.id,
    }
  }
  for (let i = 0; i < field.length; i++) {
    if (initialData[field[i].value] !== undefined) {
      updateForm = {
        ...updateForm,
        [field[i].fieldname]: initialData[field[i].value][field[i].valueChild],
      }
    }
    if (initialData[field[i].value] === undefined) {
      updateForm = {
        ...updateForm,
        [field[i].fieldname]: initialData[field[i].fieldname],
      }
    }
    if (initialData[field[i].fieldname] === 'TimeNow()') {
      updateForm = {
        ...updateForm,
        [field[i].fieldname]: moment().format('HH[:]mm'),
      }
    }
  }

  const [form, setForm] = useState(updateForm)

  const [isSuccess, setIsSuccess] = useState(false)

  const [isError, setIsError] = useState(initialError)

  const [isLoading, setIsLoading] = useState(false)

  const [listDoctor, setListDoctor] = useState(null)

  const queryClient = useQueryClient()

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

  const handleArrival = (e) => {
    if (form.department_id !== '') {
      setForm((prev) => {
        return { ...prev, doctor_id: '' }
      })
      if (listDoctor) {
        setListDoctor(null)
      }
      getDoctor(e, form.department_id)
    }
  }

  const handleChangeDepartment = (e) => {
    handleChange(e)
    if (form.doctor_id || form.doctor_id === '') {
      if (!form.arrivalTime) {
        return setIsError((prev) => {
          return { ...prev, selectDoctor: true }
        })
      }
      setForm((prev) => {
        return { ...prev, doctor_id: '' }
      })
      if (listDoctor) {
        setListDoctor(null)
      }
      getDoctor(form.arrivalTime, e.target.value)
    }
  }

  const getDoctor = async (arrivalTime, departmentID) => {
    let data
    let error = false
    await fetchData('outpatients/doctors', {
      arrival_time: arrivalTime,
      department_id: departmentID,
    })
      .then((res) => {
        data = res.data
      })
      .catch(() => {
        error = true
      })

    if (data) {
      setListDoctor(data)
    }
    setIsError((prev) => {
      return { ...prev, selectDoctor: error }
    })
  }

  const handleChangeDate = (nameField, value) => {
    if (value === '') {
      setIsError((prev) => {
        return { ...prev, [nameField]: true }
      })
    }
    if (value !== '') {
      setIsError((prev) => {
        return { ...prev, [nameField]: false }
      })
    }

    setForm((prev) => {
      return {
        ...prev,
        [nameField]: value,
      }
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
      setIsLoading(true)
      let result
      if (methodSubmit === 'post') {
        const { error } = await postData(endPoint, form)
        result = error
      }
      if (methodSubmit === 'put') {
        const { error } = await updateData(
          endPoint,
          initialData.id,
          editParam,
          form
        )
        result = error
      }

      if (!result) {
        queryClient.invalidateQueries(queryKey)
        setIsSuccess(true)
        if (methodSubmit === 'post') {
          setForm(initialData)
        }
      }

      setIsLoading(false)
      setIsError((prev) => {
        return { ...prev, submit: result }
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
                        initial={initialData[item.value]}
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

                if (item.type === 'department') {
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

                if (item.type === 'doctor') {
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
                if (item.type === 'select-with-api') {
                  if (initialData[item.value] === undefined) {
                    return (
                      <Box key={index}>
                        <SelectWithApi
                          onChange={handleChange}
                          value={form[item.fieldname]}
                          item={item}
                          error={isError[item.fieldname]}
                          endPoint={endPoint}
                        />
                      </Box>
                    )
                  }
                  return (
                    <Box key={index}>
                      <SelectWithApi
                        onChange={handleChange}
                        value={form[item.value][item.valueChild]}
                        item={item}
                        error={isError[item.fieldname]}
                        endPoint={endPoint}
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
                        param={item.param}
                      />
                    </Box>
                  )
                }

                if (item.type === 'radio-with-api') {
                  return (
                    <Box key={index}>
                      <RadioWithApi
                        onChange={handleChange}
                        value={form[item.fieldname]}
                        item={item}
                        error={isError[item.fieldname]}
                        endPoint={endPoint}
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
                        param={item.param}
                      />
                    </Box>
                  )
                }

                if (item.type === 'arrival-time') {
                  return (
                    <Box key={index}>
                      <ArrivalInput
                        value={form[item.fieldname]}
                        onChange={handleChange}
                        item={item}
                        isError={isError[item.fieldname]}
                        onSubmit={handleArrival}
                        clearList={() => {
                          setListDoctor(null)
                        }}
                      />
                    </Box>
                  )
                }

                if (item.type === 'date') {
                  return (
                    <Box key={index}>
                      <CustomDateInput
                        value={form[item.fieldname]}
                        onChange={(value) => {
                          handleChangeDate(item.fieldname, value)
                        }}
                        name={item.fieldname}
                        label={item.title}
                        isError={isError[item.fieldname]}
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
                      typeInput={item.typeInput}
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
        onClose={() => {
          setIsSuccess(false)
          handleClose()
        }}
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
