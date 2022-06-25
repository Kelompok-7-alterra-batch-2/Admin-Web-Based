import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  FormHelperText,
} from '@mui/material'

import ErrorRounded from '@mui/icons-material/ErrorRounded'

const SelectModalInput = (props) => {
  const { onChange, value, item, error, param } = props

  return (
    <FormControl error={error} fullWidth>
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
          position: 'relative',
        }}
      >
        <MenuItem value=''>None</MenuItem>

        {item.option.map((option, indexSelect) => (
          <MenuItem key={indexSelect} value={option[param.value]}>
            {option[param.title]}
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

export default SelectModalInput
