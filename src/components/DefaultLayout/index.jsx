import { 
    Box, 
    Divider, 
    Drawer, 
    List, 
    Toolbar,
    ListItem,
    Typography,
    Avatar,
    Container,
    Skeleton} from '@mui/material'
import React,{useState,useEffect} from 'react'

import axios from 'axios';

import { useLocation } from 'react-router-dom';

//Dashboard Icon
import Dashboard from '@mui/icons-material/Dashboard';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
//Appoinment Icon
import ContentPaste from '@mui/icons-material/ContentPaste';
import ContentPasteOutlined from '@mui/icons-material/ContentPasteOutlined';
//Schedule Icon
import DateRange from '@mui/icons-material/DateRange';
import DateRangeOutlined from '@mui/icons-material/DateRangeOutlined';
//Patient Icon
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentIndOutlined from '@mui/icons-material/AssignmentIndOutlined';
//Doctor Icon
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlined from '@mui/icons-material/PersonOutline';
//Prescription Icon
import MedicationIcon from '@mui/icons-material/Medication';
import MedicationOutlined from '@mui/icons-material/MedicationOutlined';
//Setting Icon
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';

import LogoutIcon from '@mui/icons-material/Logout';

import ItemList from './components/ItemList';

import Logo from 'assets/svg/Logo.svg'

const drawerWidth = 272

const listSideBar = [
    
    {
        title : 'Dashboard',
        iconActive : <Dashboard/>,
        iconDefault : <DashboardOutlined/>,
        path : '/'
    },
    {
        title : 'Appointment',
        iconActive : <ContentPaste/>,
        iconDefault : <ContentPasteOutlined/>,
        path : '/appointment'
    },
    {
        title : 'Schedule',
        iconActive : <DateRange/>,
        iconDefault : <DateRangeOutlined/>,
        path : '/schedule'
    },
    {
        title : 'Patient',
        iconActive : <AssignmentIndIcon/>,
        iconDefault : <AssignmentIndOutlined/>,
        path : '/patient',
    },
    {
        title : 'Doctor',
        iconActive : <PersonIcon/>,
        iconDefault : <PersonOutlined/>,
        path : '/doctor'
    },
    {
        title : 'Prescription',
        iconActive : <MedicationIcon/>,
        iconDefault : <MedicationOutlined/>,
        path : '/prescription'
    },
    {
        title : 'Setting',
        iconActive : <SettingsIcon/>,
        iconDefault : <SettingsOutlined/>,
        path : '/setting'
    },
    {
        title : 'Log Out',
        iconDefault : <LogoutIcon/>,
        path : ''
    },

]

export default function DefaultLayout(props) {
     
    const {children ,isLoading} = props

    const [user,setUser] = useState(null)

    const location = useLocation()

    const indexBar = listSideBar.findIndex((item)=>item.path === location.pathname)

    useEffect(()=>{

        axios({
            method : 'get',
            url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/user/2',
            data : {},
            headers : {
              'Content-Type' : 'application/json'
            }
          }).then((res)=>{
            setUser(res.data)
          })

    },[])

  return (

    <Box
    sx={{display: 'flex'}}
    >
        <Drawer
        variant='permanent'
        anchor='left'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            }
          }}
        >
            <Toolbar
            sx={{
                bgcolor : 'primary.main',
                color : 'white',
                gap : '8px',
                justifyContent : 'center',
                padding : '24px 0'
            }}
            >
                
                <img src={Logo} alt="logo" />
                
                <Typography
                variant='h3'
                >
                    Care Hospital
                </Typography>
            </Toolbar>

            <Divider/>
            
            <List
            sx={{
                bgcolor: 'primary.main',
                color : 'white',
                height : '100vh'
            }}
            >
            {listSideBar.map((list,index) => (
            
            <ListItem 
            key={index} 
            disablePadding>
              
              <ItemList
              list={list}
              />
              
            </ListItem>
          ))}
        </List>
        </Drawer>

        <Container maxWidth='xl'>

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
            {listSideBar[indexBar].title}
        </Typography>
        
        {isLoading &&

        <Box
        sx={{
            display: 'flex',
            gap : '20px'
        }}
        >

            <Skeleton
            variant='circular'
            animation='wave'
            width={48}
            height={48}/>

            <Skeleton
            animation='wave'
            width={100}
            height={48}/>
        
        </Box>
        }

        {user &&
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
            src={user.avatar_url}
            />
            
            <Box>
            <Typography variant='body2'>{user.username}</Typography>
            <Typography variant='body5'>{user.role}</Typography>
            </Box>
        
        </Box>
        }

        </Box>
        
          {children}
        
        </Container>
    
    </Box>
  
  )
}