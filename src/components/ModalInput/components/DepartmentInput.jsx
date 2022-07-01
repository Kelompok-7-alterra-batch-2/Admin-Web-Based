import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material'

import ErrorRounded from '@mui/icons-material/ErrorRounded'
import { useQuery } from 'react-query'
import { fetchData } from 'api/get'

const DepartmentInput = (props) => {
  const { onChange, value, item, error, errorEmpty } = props

  const department = useQuery('departments', () => fetchData('departments'))

  let getDepartment
  if (value !== '') {
    getDepartment = department.data.data.filter((item) => item.id === value)
  }

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
        {!department.isLoading &&
          department.data.data.map((item, index) => (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
      </Select>

      {error && (
        <FormHelperText>
          No doctor from{' '}
          {getDepartment === undefined ? '' : getDepartment[0].name} available
          at this time
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
