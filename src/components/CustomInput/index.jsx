import React from 'react'
import { styled , alpha}  from "@mui/material/styles"
import { FormControl,FormHelperText,InputBase, InputLabel } from "@mui/material"
import ErrorRounded from '@mui/icons-material/ErrorRounded'

const CustomStyle = styled(InputBase) (({ theme }) => ({
  'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      fontSize: 16,
      fontWeight : 'normal',
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      fontFamily: 'inherit',
        '&:focus': {
          boxShadow: `${alpha(theme.palette.neutral900 , 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.neutral900,
        },
      }
}))

export default function CustomInput(props) {

    const {
      label , 
      isError , 
      onChange , 
      value , 
      type,
      errorMessage
    } = props
  
    return (

    <FormControl 
    variant="standard" 
    error={isError}>

      <InputLabel 
      shrink 
      htmlFor="custom-input" 
      sx={{fontSize:'16px'}}>
        {label}
      </InputLabel>
      
      <CustomStyle
      value={value} 
      sx={{
        border:'1px solid',
        borderColor: isError? 'red' : 'neutral500',
        borderRadius:'4px'
      }} 
      onChange={(e)=>onChange(e.target.value)} 
      id="custom-input"
      type={type}
      />

      {isError && 
      <FormHelperText>
        <ErrorRounded/>
        {errorMessage}
      </FormHelperText>}
      
    </FormControl>
  
  )
}