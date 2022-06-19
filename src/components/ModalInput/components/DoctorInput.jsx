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
  const { onChange, value, item, initialData, list, error } = props

  return (
    <FormControl fullWidth error={error}>
      <Typography
        sx={{
          color: error ? 'error.main' : '',
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
        <MenuItem value=''>None</MenuItem>

        {initialData.doctor && initialData.doctor !== '' && !list && (
          <MenuItem value={initialData.doctor}>{initialData.doctor}</MenuItem>
        )}

        {list &&
          list.map((option, index) => (
            <MenuItem key={index} value={option.name}>
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
            {`Field ${item.title} is empty`}
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  )
}

export default DoctorInput
