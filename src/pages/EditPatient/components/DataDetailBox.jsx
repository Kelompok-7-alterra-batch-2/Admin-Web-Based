import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

import moment from 'moment'

const DataDetailBox = (props) => {
  const { data, onChange, isError } = props

  const numberRegex = /^[0-9\b]+$/
  const format = 'YYYY[-]MM[-]DD'

  const handleChange = (e) => {
    if (e.target.value === '') {
      return onChange(e)
    }
    if (e.target.name === 'phoneNumber' && !numberRegex.test(e.target.value)) {
      return
    }
    if (e.target.name === 'dob') {
      const max = moment().add(1, 'M')
      const min = moment('1920-01-01')
      const maxCheck = moment.min(moment(e.target.value), max)
      const minCheck = moment.max(maxCheck, min).format(format)
      if (minCheck === 'Invalid date') {
        return onChange({
          target: {
            value: '',
            name: 'dob',
          },
        })
      }
      return onChange({
        target: {
          name: 'dob',
          value: minCheck,
        },
      })
    }

    onChange(e)
  }

  return (
    <Card
      sx={{
        width: '60%',
        borderRadius: '4px',
        bgcolor: 'neutral200',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'start',
          columnGap: '16px',
          justifyContent: 'center',
          padding: '32px 0',
        }}
      >
        <Box>
          <FormControl
            sx={{
              minWidth: 120,
            }}
            variant='standard'
            error={isError.gender_id}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              name='gender_id'
              value={data.gender_id}
              onChange={handleChange}
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
            </Select>
            {isError.gender_id && (
              <FormHelperText variant='filled'>
                Gender Cant Empty
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            error={isError.dob}
            name='dob'
            variant='standard'
            label='Date Of Birth'
            type='date'
            value={data.dob}
            onChange={handleChange}
            helperText={isError.dob ? 'Date Of Birth Cant Empty' : ''}
          />
          <TextField
            error={isError.phoneNumber}
            name='phoneNumber'
            variant='standard'
            label='Phone Number'
            onChange={handleChange}
            value={data.phoneNumber}
            helperText={isError.phoneNumber ? 'Phone Number Cant Empty' : ''}
          />
          <TextField
            error={isError.address}
            name='address'
            variant='standard'
            label='Address'
            multiline
            rows={3}
            onChange={handleChange}
            value={data.address}
            helperText={isError.address ? 'Address Cant Empty' : ''}
          />
        </Box>
        <Box>
          <IconButton
            sx={{
              borderRadius: '10px',
              backgroundColor: 'neutral100',
              padding: '14px 16px',
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '10px',
              backgroundColor: 'neutral100',
              padding: '14px 16px',
              color: 'error.main',
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '10px',
              backgroundColor: 'neutral100',
              padding: '14px 16px',
              color: 'success.main',
            }}
          >
            <CheckIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DataDetailBox
