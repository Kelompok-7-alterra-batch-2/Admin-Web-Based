import ErrorRounded from '@mui/icons-material/ErrorRounded'
import {
  Box,
  FormHelperText,
  FormControl,
  Typography,
  MenuItem,
  Select,
} from '@mui/material'

const DoctorInput = (props) => {
  const { onChange, value, list, error } = props
  return (
    <FormControl fullWidth error={error}>
      <Typography
        sx={{
          color: error ? 'error.main' : '',
          fontSize: '14px',
          fontWeight: 'normal',
        }}
      >
        Doctor Name
      </Typography>

      <Select
        name='doctor_id'
        value={value}
        onChange={onChange}
        size='small'
        sx={{
          fontSize: '16px',
          fontWeight: 'normal',
        }}
      >
        <MenuItem value=''>None</MenuItem>

        {list &&
          list.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
      {error && (
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
          <FormHelperText variant='filled'>
            Field Doctor is empty
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  )
}

export default DoctorInput
