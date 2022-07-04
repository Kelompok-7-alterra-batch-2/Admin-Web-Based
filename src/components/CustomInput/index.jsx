import { styled, alpha } from '@mui/material/styles'
import {
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  Box,
} from '@mui/material'
import ErrorRounded from '@mui/icons-material/ErrorRounded'

const CustomStyle = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 16,
    fontWeight: 'normal',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: 'inherit',
    '&:focus': {
      boxShadow: `${alpha(theme.palette.neutral900, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.neutral900,
    },
  },
}))

export default function CustomInput(props) {
  const {
    label,
    isError,
    onChange,
    value,
    type,
    errorMessage,
    sx,
    name,
    key,
    endAdornment,
    rows,
    multiline,
    typeInput,
  } = props

  const numberRegex = /^[0-9\b]+$/

  const letterRegex = /^[A-Za-z\s]+$/

  const textRegex = /^[0-9A-Za-z\s]+$/

  const noNumberRegex = /[A-Za-z'.,\s]$/

  const handleChange = (e) => {
    if (e.target.value === '') {
      return onChange(e)
    }
    if (typeInput === 'number' && !numberRegex.test(e.target.value)) {
      return
    }

    if (typeInput === 'letter' && !letterRegex.test(e.target.value)) {
      return
    }
    if (typeInput === 'noSymbol' && !textRegex.test(e.target.value)) {
      return
    }
    if (typeInput === 'noNumber' && !noNumberRegex.test(e.target.value)) {
      return
    }
    onChange(e)
  }

  return (
    <FormControl variant='standard' error={isError} sx={sx} key={key} fullWidth>
      <InputLabel
        shrink
        htmlFor='custom-input'
        sx={{
          fontSize: '18px',
          fontWeight: '700',
        }}
      >
        {label}
      </InputLabel>

      <CustomStyle
        endAdornment={endAdornment}
        name={name}
        value={value}
        sx={{
          border: '1px solid',
          borderColor: isError ? 'red' : 'neutral500',
          borderRadius: '4px',
        }}
        onChange={handleChange}
        id='custom-input'
        type={type}
        multiline={multiline}
        rows={rows}
      />

      {isError && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ErrorRounded
            sx={{
              color: 'error.main',
            }}
          />
          <FormHelperText variant='filled'>{errorMessage}</FormHelperText>
        </Box>
      )}
    </FormControl>
  )
}
