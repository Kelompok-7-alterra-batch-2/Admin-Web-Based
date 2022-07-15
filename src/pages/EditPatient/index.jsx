import Box from '@mui/material/Box'

import PersonalDataBox from './components/PersonalDataBox'

import OutpatientsBox from './components/OutpatietsBox'

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
          alignItems: 'start',
          bgcolor: 'neutral100',
          marginTop: '50px',
          padding: '10px',
        }}
      >
        <OutpatientsBox />
      </Box>
    </>
  )
}
