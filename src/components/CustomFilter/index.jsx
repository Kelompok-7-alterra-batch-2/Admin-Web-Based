import React from 'react'

import { FormControl, Select, MenuItem, OutlinedInput } from '@mui/material'

export default function CustomFilter(props) {
  const { onChange, value, placeholder, filters, sx, param } = props

  return (
    <FormControl size='small' sx={sx}>
      <Select
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        sx={{
          fontSize: '16px',
          fontWeight: 'normal',
        }}
        displayEmpty
      >
        <MenuItem disabled value=''>
          {placeholder}
        </MenuItem>

        <MenuItem value='all'>All</MenuItem>

        {filters.map((filter, index) => (
          <MenuItem key={index} value={filter[param.value]}>
            {filter[param.title]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
