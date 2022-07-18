import { Box } from '@mui/material'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import DoctorBox from './components/DoctorBox'
import { useQuery } from 'react-query'
import { fetchData, fetchUser } from '@/api/get'
import { getToken } from '@/helpers/function/getToken'
import { useNavigate } from 'react-router-dom'

import { getModalExpired } from '@/helpers/function/getModalExpired'

export default function Dashboard() {
  const usersQuery = useQuery([getToken().email, getToken()], () =>
    fetchUser(getToken().email,getToken().token)
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

  const navigate = useNavigate()

  if (usersQuery.isError) {
    getModalExpired().then(() => {
      navigate('/login')
    })
  }

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
