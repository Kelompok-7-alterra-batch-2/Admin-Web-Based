import React from 'react'

import { Chip } from '@mui/material'

import { toCapitalize } from 'helpers/function/toCapitalize'

export default function CustomChip(props) {

  const { params } = props

  let colorChip = {
    foreground : 'warning',
    background : 'bgWarning'
  }

  if(params === 'complete'){

    colorChip = {
      foreground : 'success',
      background : 'bgSuccess'
    }

  }
  if(params === 'process'){

    colorChip = {
      foreground : 'primary',
      background : 'bgPrimary'
    }

  }
  
  let capitalize = toCapitalize(params)

  return (

          <Chip 
          label={capitalize}
          variant='outlined'
          color={colorChip.foreground}
          sx={{
              borderRadius : '4px',
              bgcolor : colorChip.background
          }}
          />    

  )
}
