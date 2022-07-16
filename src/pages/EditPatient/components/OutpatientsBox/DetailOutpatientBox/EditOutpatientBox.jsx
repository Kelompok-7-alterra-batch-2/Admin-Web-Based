import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const EditOutpatientBox = (props) => {
  const { dataOutpatient, isEdit, onChange, isError } = props

  console.log(isError)

  const handleChange = (e) => {
    onChange(e)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px',
      }}
    >
      <TextField
        disabled={!isEdit}
        value={dataOutpatient.appointmentReason}
        name='appointmentReason'
        onChange={handleChange}
        sx={{
          bgcolor: '#fff',
          borderRadius: '8px',
        }}
        id='standard-textarea'
        label='Main Complaint'
        placeholder='Main Complaint'
        multiline
        rows={3}
        variant='standard'
        error={isError.appointmentReason}
        helperText={
          isError.appointmentReason ? 'Main Complaint Cant Empty' : ''
        }
      />
      <TextField
        disabled={!isEdit}
        value={dataOutpatient.diagnosis ? dataOutpatient.diagnosis : ''}
        name='diagnosis'
        onChange={handleChange}
        sx={{
          bgcolor: '#fff',
          borderRadius: '8px',
        }}
        id='standard-textarea'
        label='Diagnosis'
        placeholder='Diagnosis'
        multiline
        rows={3}
        variant='standard'
        error={isError.diagnosis}
        helperText={isError.diagnosis ? 'Diagnosis Cant Empty' : ''}
      />
      <TextField
        disabled={!isEdit}
        value={dataOutpatient.prescription ? dataOutpatient.prescription : ''}
        name='prescription'
        onChange={handleChange}
        sx={{
          bgcolor: '#fff',
          borderRadius: '8px',
        }}
        id='standard-textarea'
        label='Prescription'
        placeholder='Prescription'
        multiline
        rows={3}
        variant='standard'
        error={isError.prescription}
        helperText={isError.prescription ? 'Prescription Cant Empty' : ''}
      />
    </Box>
  )
}

export default EditOutpatientBox
