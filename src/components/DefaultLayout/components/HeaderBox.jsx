import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

import { useLocation } from 'react-router-dom'

export default function HeaderBox(props) {

    const {listBar} = props

    const location = useLocation()

    const indexBar = listBar.findIndex((item)=>item.path === location.pathname)

  return (

    <Box
    sx={{
      display : 'flex',
      height: '88px',
      padding : '0 40px',
      bgcolor : 'neutral200',
      justifyContent : 'space-between',
      alignItems : 'center',
      borderRadius : '0 0 8px 8px',
      marginBottom : '30px'
    }}
    maxWidth='xl'
    >

      <Typography variant='h3'>
        {listBar[indexBar].title}
      </Typography>

      <Box
      sx={{
        display: 'flex',
        gap : '20px'
      }}
      >
        <Avatar
        sx={{
          width : '48px',
          height : '48px'
        }}
        />
        
        <Box>
          <Typography variant='body2'>Hai, Kevin</Typography>
          <Typography variant='body5'>Admin</Typography>
        </Box>
      
      </Box>

    </Box>
  )
}
