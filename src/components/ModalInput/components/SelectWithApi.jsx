import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material'

import ErrorRounded from '@mui/icons-material/ErrorRounded'
import { fetchData } from '@/api/get'
import { useEffect, useState } from 'react'

const SelectWithApi = (props) => {
  const { onChange, value, item, error } = props
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchData(item.endPoint).then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [item.endPoint])

  if (isLoading) {
    return (
      <CircularProgress
        size={24}
        sx={{
          color: 'primary.main',
        }}
      />
    )
  }

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

        {!isLoading &&
          data &&
          data.map((option, indexSelect) => (
            <MenuItem key={indexSelect} value={option.id}>
              {option.type}
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
export default SelectWithApi
