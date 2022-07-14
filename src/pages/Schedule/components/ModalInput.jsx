import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

import CloseIcon from '@mui/icons-material/Close'

import { fetchData } from '@/api/get'
import { postData } from '@/api/post'
import { getToken } from '@/helpers/function/getToken'
import { listField, initialData, initialError } from '@/constants/schedule'

import { CustomInput } from '@/components'
import DepartmentInput from './DepartmentInput'
import DoctorInput from './DoctorInput'
import ModalSuccess from '@/components/ModalInput/components/ModalSuccess'

const ModalInput = (props) => {
  const { open, onClose } = props

  const [value, setValue] = useState(initialData)

  const [listDoctor, setListDoctor] = useState(null)

  const [isError, setIsError] = useState(initialError)

  const [isLoading, setIsLoading] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  const queryClient = useQueryClient()

  const handleChangeDepartment = async (e) => {
    setValue((prev) => {
      return { ...prev, department: e.target.value }
    })
    if (value.doctor_id !== '') {
      setValue((prev) => {
        return { ...prev, doctor_id: '' }
      })
    }
    let data
    let error = false
    await fetchData(`doctors/departments/${e.target.value}`, getToken().token)
      .then((res) => {
        data = res.data
      })
      .catch(() => {
        error = true
      })

    if (data) {
      setListDoctor(data)
    }
    setIsError(error)
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

    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async () => {
    let paramError
    for (let i = 0; i < listField.length; i++) {
      if (value[listField[i]] === '') {
        paramError = true
        setIsError((prev) => {
          return { ...prev, [listField[i]]: true }
        })
      }
      if (value[listField[i]] !== '') {
        setIsError((prev) => {
          return { ...prev, [listField[i]]: false }
        })
      }
    }
    if (!paramError) {
      setIsLoading(true)
      const { error } = await postData('doctors/schedule', {
        doctor_id: value.doctor_id,
        availableFrom: value.availableFrom,
        availableTo: value.availableTo,
      })
      if (!error) {
        queryClient.invalidateQueries('schedule')
        setIsSuccess(true)
        setValue(initialData)
      }
      setIsLoading(false)
      setIsError((prev) => {
        return { ...prev, submit: error }
      })
    }
  }

  return (
    <>
      <Modal
        aria-labelledby='modal-input-title'
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
                onClick={() => {
                  onClose()
                }}
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
                New Schedule
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
              <DepartmentInput
                onChange={handleChangeDepartment}
                value={value.department}
              />
              <DoctorInput
                onChange={handleChange}
                value={value.doctor_id}
                list={listDoctor}
                error={isError.doctor_id}
              />
              <CustomInput
                value={value.availableFrom}
                onChange={handleChange}
                type='time'
                label='Available From'
                name='availableFrom'
                isError={isError.availableFrom}
                errorMessage='Field Available From is empty'
              />
              <CustomInput
                value={value.availableTo}
                onChange={handleChange}
                type='time'
                label='Available To'
                name='availableTo'
                isError={isError.availableTo}
                errorMessage='Field Available To is empty'
              />
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
          onClose()
        }}
        descTitle='Schedule'
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

export default ModalInput
