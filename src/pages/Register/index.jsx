import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// components
import { Box } from '@mui/system'
import {
  Typography,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import Swal from 'sweetalert2'

// assets
import Logo from '@/assets/svg/Logo2.svg'

// api
import { postRegister } from '@/api/post'

const Register = () => {
  // States & Variable
  const [values, setValues] = useState({
    showPassword: false,
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    dob: '',
  })
  const navigate = useNavigate()

  // Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  const validateName = (value) => {
    return value.match(/^[a-zA-Z ,.'-]+$/i)
  }
  const helperName = useMemo(() => {
    if (!values.name)
      return {
        text: ' ',
        error: false,
      }
    const isValid = validateName(values.name)
    let isEnough = true
    if (values.name.length < 6) {
      isEnough = false
    }
    return {
      text: isValid && isEnough ? ' ' : 'Enter a valid name',
      error: isValid && isEnough ? false : true,
    }
  }, [values.name])

  const validatePhone = (value) => {
    return value.match(/^[0-9+\b]+$/)

  }
  const helperPhone = useMemo(() => {
    if (!values.phoneNumber)
      return {
        text: ' ',
        error: false,
      }
    const isValid = validatePhone(values.phoneNumber)
    let isEnough = true
    if (values.phoneNumber.length < 6) {
      isEnough = false
    }
    return {
      text: isValid && isEnough ? ' ' : 'Enter a valid phone number',
      error: isValid && isEnough ? false : true,
    }
  }, [values.phoneNumber])

  // Helper Email
  const validateEmail = (value) => {
    return value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    )
  }
  const helperEmail = useMemo(() => {
    if (!values.email)
      return {
        text: ' ',
        error: false,
      }
    const isValid = validateEmail(values.email)
    return {
      text: isValid ? ' ' : 'Enter a valid email',
      error: isValid ? false : true,
    }
  }, [values.email])

  // Helper Password
  const validatePassword = (value) => {
    return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
  }
  const helperPassword = useMemo(() => {
    if (!values.password)
      return {
        text: ' ',
        error: false,
      }
    const isValid = validatePassword(values.password)
    return {
      text: isValid ? ' ' : 'Enter a valid password',
      error: isValid ? false : true,
    }
  }, [values.password])

  const handleChangeDate = (e) => {
    const format = 'YYYY[-]MM[-]DD'
    const max = moment().add(1, 'M')
    const min = moment('1920-01-01')
    const maxCheck = moment.min(moment(e.target.value), max)
    const minCheck = moment.max(maxCheck, min).format(format)
    if (minCheck === 'Invalid date') {
      return onChange('')
    }
    setValues((prev) => {
      return { ...prev, dob: minCheck }
    })
  }

  // Function
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !helperEmail.error ||
      !helperPassword.error ||
      !helperName.error ||
      !helperPhone.error
    ) {
      const { error } = await postRegister(values)
      if (!error) {
        navigate('/login')
        setTimeout(() => {
          Toast.fire({
            icon: 'success',
            title: 'Registered successfully',
          })
        }, 100)
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Registered Error',
        })
      }
    }
  }

  // useEffect
  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (JSON.parse(localStorage.getItem('token')).role === 'admin') {
        navigate('/')
      } else {
        localStorage.removeItem('token')
      }
    }
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '25rem',
          bgcolor: 'white',
          my: '6rem',
          borderRadius: '24px',
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
          padding: '2rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img width='128px' src={Logo} alt='logo' />
          <Box
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'primary.main',
              pt: '0.5rem',
              pb: '2rem',
            }}
          >
            Care Hospital
          </Box>
        </Box>

        <Box component='form' onSubmit={handleSubmit}>
          <InputLabel
            shrink
            htmlFor='register-name'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Name
          </InputLabel>
          <TextField
            fullWidth
            required
            id='register-name'
            size='small'
            type='text'
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            error={helperName.error}
          />
          {helperName.error ? (
            <FormHelperText error>{helperName.text}</FormHelperText>
          ) : (
            <FormHelperText> </FormHelperText>
          )}
          <InputLabel
            shrink
            htmlFor='register-dob'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Date of Birth
          </InputLabel>
          <TextField
            sx={{
              mb: '25px',
            }}
            fullWidth
            required
            id='register-dob'
            size='small'
            type='date'
            value={values.dob}
            onChange={handleChangeDate}
          />
          <InputLabel
            shrink
            htmlFor='register-phone'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Phone Number
          </InputLabel>
          <TextField
            fullWidth
            required
            id='register-phone'
            size='small'
            type='text'
            value={values.phoneNumber}
            onChange={(e) =>
              setValues({ ...values, phoneNumber: e.target.value })
            }
            error={helperPhone.error}
          />
          {helperPhone.error ? (
            <FormHelperText error>{helperPhone.text}</FormHelperText>
          ) : (
            <FormHelperText> </FormHelperText>
          )}
          <InputLabel
            shrink
            htmlFor='register-email'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Email
          </InputLabel>
          <TextField
            fullWidth
            required
            id='register-email'
            size='small'
            type='text'
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            error={helperEmail.error}
          />
          {helperEmail.error ? (
            <FormHelperText error>{helperEmail.text}</FormHelperText>
          ) : (
            <FormHelperText> </FormHelperText>
          )}
          <InputLabel
            shrink
            htmlFor='register-password'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            fullWidth
            required
            id='login-password'
            size='small'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            error={helperPassword.error}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() =>
                    setValues({
                      ...values,
                      showPassword: !values.showPassword,
                    })
                  }
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {helperPassword.error ? (
            <FormHelperText error>{helperPassword.text}</FormHelperText>
          ) : (
            <></>
          )}
          <Button
            sx={{
              mt: '30px',
            }}
            type='submit'
            fullWidth
            variant='contained'
            disabled={
              helperEmail.error ||
              helperPassword.error ||
              helperPhone.error ||
              helperName.error
            }
          >
            Register
          </Button>
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            mt: '20px',
            color: 'neutral700',
          }}
        >
          Have Account already?
        </Typography>
        <Button
          sx={{
            mt: '20px',
          }}
          fullWidth
          variant='contained'
          onClick={() => {
            navigate('/login')
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  )
}
export default Register
