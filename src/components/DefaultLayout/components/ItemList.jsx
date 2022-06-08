import React from 'react'

import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

import { useLocation , useNavigate } from 'react-router-dom'

export default function ItemList(props) {

    const {list} = props

    const location = useLocation()

    const navigate = useNavigate()

    const moveTo = () =>{

        navigate(list.path)

    }
    
  return (

            <ListItemButton
            sx={{
            padding : '16px 32px 16px 25px',
            gap : '8px',
            borderLeft : location.pathname === list.path ? 
            '7px solid white' : '7px solid transparent'
            }}
            onClick={moveTo}
            >
                <ListItemIcon
                sx={{
                    color : 'white'
                }}
                >
                  {location.pathname === list.path ? list.iconActive : list.iconDefault}
                </ListItemIcon>

                <ListItemText
                disableTypography
                sx={{
                    fontSize:'16px',
                    fontWeight : 'bold'
                }}
                primary={list.title} 
                />

            </ListItemButton>

  )
}