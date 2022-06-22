import ErrorRounded from '@mui/icons-material/ErrorRounded'
import {
  Box,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material'
import { fetchData } from 'api/get'
import { useEffect, useState } from 'react'

const RadioWithApi = (props) => {
  const { onChange, value, error, item } = props

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
    <FormControl error={error}>
      <FormLabel
        id='radio-button-group-label'
        sx={{
          textAlign: 'left',
          fontSize: '16px',
        }}
      >
        {item.title}
      </FormLabel>

      <RadioGroup
        aria-labelledby='radio-button-group-label'
        name={item.fieldname}
        value={value}
        onChange={onChange}
      >
        {!isLoading &&
          data &&
          data.map((option, indexRadio) => (
            <FormControlLabel
              key={indexRadio}
              value={option.id}
              control={<Radio />}
              label={option.type}
            />
          ))}
      </RadioGroup>

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

export default RadioWithApi
