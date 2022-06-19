import React from 'react'

import { Box } from '@mui/material'

import { DefaultLayout } from 'components'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import DoctorBox from './components/DoctorBox'

export default function Dashboard() {

  return (
    
    <DefaultLayout>

      <Box
      sx={{
        display : 'flex',
        flexDirection : 'column',
        gap : '30px',
        pb : '50px'
      }}
      >

        <WelcomeBox/>

        <OverviewBox/>

        <DoctorBox/>

      </Box>
    
    </DefaultLayout>
  
  )
}