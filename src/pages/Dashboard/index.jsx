import { Box } from '@mui/material'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import DoctorBox from './components/DoctorBox'
import { useQuery } from 'react-query'
import { fetchData, fetchUser } from '@/api/get'
import { getToken } from '@/helpers/function/getToken'

export default function Dashboard() {
  const usersQuery = useQuery([getToken().email, getToken().email], () =>
    fetchUser(getToken().email)
  )
  const doctorQuery = useQuery(['doctors', getToken().token], () =>
    fetchData('doctors', getToken().token)
  )
  const appointmentQuery = useQuery(
    ['count-outpatient-today', getToken().token],
    () => fetchData('outpatients/count/today', getToken().token)
  )
  const patientQuery = useQuery(['patients', getToken().token], () =>
    fetchData('patients', getToken().token)
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        pb: '50px',
      }}
    >
      <WelcomeBox
        isLoading={usersQuery.isLoading}
        user={usersQuery.data?.data}
      />
      <OverviewBox
        doctor={doctorQuery.data?.data}
        appointment={appointmentQuery.data?.data}
        patient={patientQuery.data?.data}
        isLoading={doctorQuery.isLoading && appointmentQuery.isLoading}
      />

      <DoctorBox
        doctor={doctorQuery.data?.data}
        isLoading={doctorQuery.isLoading}
      />
    </Box>
  )
}
