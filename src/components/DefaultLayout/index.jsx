import { 
    Box, 
    Divider, 
    Drawer, 
    List, 
    Toolbar,
    ListItem,
    Typography,
    Container} from '@mui/material'
import React from 'react'
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
import HeaderBox from './components/HeaderBox';

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

export default function DefaultLayout({children}) {

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

          <HeaderBox
          listBar={listSideBar}
          />
        
          {children}
        
        </Container>
    
    </Box>
  
  )
}