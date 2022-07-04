import ErrorRounded from '@mui/icons-material/ErrorRounded'
import {
  Box,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

const RadioModalInput = (props) => {
  const { onChange, value, error, item, param } = props

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
        {item.option.map((option, indexRadio) => (
          <FormControlLabel
            key={indexRadio}
            value={option[param.value]}
            control={<Radio />}
            label={option[param.title]}
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

export default RadioModalInput
