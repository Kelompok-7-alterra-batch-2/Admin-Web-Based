import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// components
import { Box } from '@mui/system'
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

// assets
import Logo from '@/assets/svg/Logo2.svg'

export const Login = () => {
  // States & Variable
  const [values, setValues] = useState({
    showPassword: false,
    email: '',
    password: '',
  })

  // Helper
  const validateEmail = (value) => {
    return value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    )
  }
  const helper = useMemo(() => {
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

  // Function
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!helper.error) {
      console.log(values)
      setValues({
        showPassword: false,
        email: '',
        password: '',
      })
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '23rem',
          height: '30rem',
          bgcolor: 'white',
          margin: '1.2rem',
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
            htmlFor='login-email'
            sx={{ fontSize: '18px', color: 'black' }}
          >
            Email
          </InputLabel>
          <TextField
            fullWidth
            required
            id='login-email'
            size='small'
            type='text'
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            helperText={helper.text}
            error={helper.error}
          />
          <InputLabel
            shrink
            htmlFor='login-password'
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
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={(e) =>
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
          <br />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              fontSize: '14px',
              paddingTop: '0.3rem',
            }}
          >
            <Link style={{ textDecoration: 'none', color: '#B3BDC9' }} to='/'>
              Forget password?
            </Link>
          </Box>
          <br />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={helper.error}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
