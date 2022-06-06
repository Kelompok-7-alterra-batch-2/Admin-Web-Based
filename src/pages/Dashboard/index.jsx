import React from 'react'

import { Box } from '@mui/material'

import WelcomeBox from './components/WelcomeBox'
import OverviewBox from './components/OverviewBox'
import TableBox from './components/TableBox'

export default function Dashboard() {

  return (
    
    <Box
    sx={{
      display : 'flex',
      flexDirection : 'column',
      gap : '30px'
    }}
    >

      <WelcomeBox/>

      <OverviewBox/>

      <TableBox/>

    </Box>
  )
}
