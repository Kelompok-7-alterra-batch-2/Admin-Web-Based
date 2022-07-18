import Box from '@mui/material/Box'

import PersonalDataBox from './components/PersonalDataBox'

import OutpatientsBox from './components/OutpatientsBox'

export default function EditPatient() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'stretch',
        }}
      >
        <PersonalDataBox />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          columnGap: '25px',
          bgcolor: 'neutral200',
          marginTop: '50px',
          padding: '30px',
          borderRadius: '8px',
        }}
      >
        <OutpatientsBox />
      </Box>
    </>
  )
}
