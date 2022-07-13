import { Box } from '@mui/material'

import { DefaultLayout } from '@/components'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import DoctorBox from './components/DoctorBox'
import { useQuery } from 'react-query'
import { fetchAppointment, fetchData, fetchUser } from '@/api/get'

const userId = 'afwan@gmail.com'
export default function Dashboard() {
  const usersQuery = useQuery([userId, userId], () => fetchUser(userId))
  // const doctorQuery = useQuery(['doctors', 'doctors'], () =>
  //   fetchData('doctors')
  // )
  // const appointmentQuery = useQuery('count-outpatient-today', () => fetchData('bloods'))
  // const patientQuery = useQuery(['patients', 'patients'], () =>
  //   fetchData('patients')
  // )

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
     isLoading={false}
     user={null}
        // isLoading={usersQuery.isLoading}
        // user={usersQuery.data?.data}
      />
      <OverviewBox
        // doctor={doctorQuery.data?.data}
        // appointment={appointmentQuery.data}
        // patient={patientQuery.data?.data}
        // isLoading={doctorQuery.isLoading && appointmentQuery.isLoading}
      />

      <DoctorBox
        // doctor={doctorQuery.data?.data}
        // isLoading={doctorQuery.isLoading}
      />
    </Box>
  )
}
