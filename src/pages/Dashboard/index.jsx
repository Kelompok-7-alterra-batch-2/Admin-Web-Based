import React from 'react'

import { Box } from '@mui/material'

import { DefaultLayout } from 'components'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import DoctorBox from './components/DoctorBox'
import { useQuery } from 'react-query'
import { fetchAppointment, fetchDoctor, fetchUser } from 'api/get'

const userId = '1'
export default function Dashboard() {
  const usersQuery = useQuery([userId, userId], () => fetchUser(userId))
  const doctorQuery = useQuery('doctor', fetchDoctor)
  const appointmentQuery = useQuery('appointment', fetchAppointment)

  return (
    <DefaultLayout
      data={usersQuery.data?.data}
      isLoading={usersQuery.isLoading}
    >
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
          doctor={doctorQuery.data}
          appointment={appointmentQuery.data}
          isLoading={doctorQuery.isLoading && appointmentQuery.isLoading}
        />

        <DoctorBox
          doctor={doctorQuery.data}
          isLoading={doctorQuery.isLoading}
        />
      </Box>
    </DefaultLayout>
  )
}
