import React from 'react'

import { FormControl, Select, MenuItem, OutlinedInput } from '@mui/material'

export default function CustomFilter(props) {

    const {onChange,value,placeholder,filters,sx} = props

  return (

    <FormControl
    size='small'
    sx={sx}
    >

        <Select
        value={value}
        onChange={onChange}
        input={<OutlinedInput/>}
        sx={{
            fontSize : '16px',
            fontWeight : 'normal'
        }}
        displayEmpty
        >
            
            <MenuItem
            disabled
            value=''>
            {placeholder}
            </MenuItem>

            {filters.map((filter,index)=>(

            <MenuItem
            key={index}
            value={filter.value}>
                {filter.title}
            </MenuItem>

            ))}

        </Select>

    </FormControl>
  )
}
