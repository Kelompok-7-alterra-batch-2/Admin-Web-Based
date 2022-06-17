import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material'

import ErrorRounded from '@mui/icons-material/ErrorRounded'

const DepartmentInput = (props) => {
  const { onChange, value, item, error, errorEmpty } = props

  return (
    <FormControl fullWidth error={error || errorEmpty}>
      <Typography
        sx={{
          color: error || errorEmpty ? 'error.main' : '',
          fontSize: '14px',
          fontWeight: 'normal',
        }}
      >
        {item.title}
      </Typography>

      <Select
        name={item.fieldname}
        value={value}
        onChange={onChange}
        size='small'
        sx={{
          fontSize: '16px',
          fontWeight: 'normal',
        }}
      >
        <MenuItem disabled value=''>
          None
        </MenuItem>

        <MenuItem value='general'>General</MenuItem>

        <MenuItem value='neurology'>Neurology</MenuItem>

        <MenuItem value='cardiology'>Cardiology</MenuItem>

        <MenuItem value='pediatric'>Pediatric</MenuItem>

        <MenuItem value='gynecology'>Gynecology</MenuItem>
      </Select>

      {error && (
        <FormHelperText>
          No doctor from {value} available at this time
        </FormHelperText>
      )}

      {errorEmpty && (
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
            {`Field ${item.title} is empty`}
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  )
}

export default DepartmentInput
