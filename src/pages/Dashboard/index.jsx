import React,{useState} from 'react'

import { Button, TextField, Typography } from '@mui/material'

import { CustomInput } from 'components'

export default function Dashboard() {

  const [input,setInput] = useState('')

  console.log(input)

  return (
    <>
    {/* example material ui*/}
    <Button variant='contained'>default</Button>
    
    <Typography variant='body2'>Halo</Typography>
    <Typography variant='body3'>Halo</Typography>
    
    <TextField
    label='halo@gmail.com'
    placeholder='hlo'
    />
    
    <CustomInput 
    label='Email' 
    isError={true}
    onChange={(e)=>setInput(e)}
    value={input}
    type='date'
    errorMessage='Email is Not Valid'
    />

    <CustomInput 
    label='Password' 
    onChange={(e)=>setInput(e)}
    value={input}
    type='password'
    />

    </>
  )
}
