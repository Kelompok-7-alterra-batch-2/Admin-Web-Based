import {
  Snackbar,
  Alert,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  ListItem,
  Typography,
  Avatar,
  Skeleton,
} from '@mui/material'
import { useState, useEffect } from 'react'

import { useLocation, Outlet, useNavigate } from 'react-router-dom'

//Dashboard Icon
import Dashboard from '@mui/icons-material/Dashboard'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
//Appoinment Icon
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone'
import ContentPasteOutlined from '@mui/icons-material/ContentPasteOutlined'
//Schedule Icon
import DateRange from '@mui/icons-material/DateRange'
import DateRangeOutlined from '@mui/icons-material/DateRangeOutlined'
//Patient Icon
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import AssignmentIndOutlined from '@mui/icons-material/AssignmentIndOutlined'
//Doctor Icon
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlined from '@mui/icons-material/PersonOutline'
//History Icon
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'

import LogoutIcon from '@mui/icons-material/Logout'

import ItemList from './components/ItemList'

import Logo from '@/assets/svg/Logo.svg'

import { fetchUser ,fetchData } from '@/api/get'
import { Container } from '@mui/system'

const drawerWidth = 272

const listSideBar = [
  {
    title: 'Dashboard',
    iconActive: <Dashboard />,
    iconDefault: <DashboardOutlined />,
    path: '/',
  },
  {
    title: 'Appointment',
    iconActive: <ContentPasteTwoToneIcon />,
    iconDefault: <ContentPasteOutlined />,
    path: '/appointment',
  },
  {
    title: 'Schedule',
    iconActive: <DateRange />,
    iconDefault: <DateRangeOutlined />,
    path: '/schedule',
  },
  {
    title: 'Patient',
    iconActive: <AssignmentIndIcon />,
    iconDefault: <AssignmentIndOutlined />,
    path: '/patient',
  },
  {
    title: 'Doctor',
    iconActive: <PersonIcon />,
    iconDefault: <PersonOutlined />,
    path: '/doctor',
  },
  {
    title: 'History',
    iconActive: <WorkHistoryIcon />,
    iconDefault: <WorkHistoryOutlinedIcon />,
    path: '/history',
  },
  {
    title: 'Log Out',
    iconDefault: <LogoutIcon />,
    path: '',
  },
]

const userId = "afwan@gmail.com"

export default function DefaultLayout() {
  const [user, setUser] = useState(null)

  const [isError, setIsError] = useState(false)

  const [isLoadUser, setIsLoadUser] = useState(false)

  const location = useLocation()

  const indexBar = listSideBar.findIndex(
    (item) => item.path === location.pathname
  )

  const navigate = useNavigate()

  useEffect(() => {
    getUser(userId)
  }, [])

  const getUser = async (param) => {
    setIsLoadUser(true)
    fetchData('bloods')
    //   .then((res) => {
    //     setUser(res.data)
    //   })
    //   .catch(() => {
    //     setIsError(true)
    //   })
    // setIsLoadUser(false)
  }

  if (!JSON.parse(localStorage.getItem("token"))) {
    navigate("/login");
  }
  
  if (JSON.parse(localStorage.getItem("token")).role !== "admin") {
    localStorage.removeItem('token')
    navigate("/login");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant='permanent'
        anchor='left'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            gap: '8px',
            justifyContent: 'center',
            padding: '24px 0',
          }}
        >
          <img src={Logo} alt='logo' />

          <Typography variant='h3'>Care Hospital</Typography>
        </Toolbar>

        <Divider />

        <List
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            height: '100vh',
          }}
        >
          {listSideBar.map((list, index) => (
            <ListItem key={index} disablePadding>
              <ItemList list={list} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          width: '100%',
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '88px',
            padding: '0 50px',
            bgcolor: 'neutral200',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
          }}
          maxWidth='xl'
        >
          <Typography variant='h3'>
            {listSideBar[indexBar] === undefined
              ? 'Edit Patient'
              : listSideBar[indexBar].title}
          </Typography>

          {isLoadUser && (
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <Skeleton
                variant='circular'
                animation='wave'
                width={48}
                height={48}
              />

              <Skeleton animation='wave' width={100} height={48} />
            </Box>
          )}

          {user && (
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <Avatar
                sx={{
                  width: '48px',
                  height: '48px',
                }}
                src={user.avatar_url}
              />

              <Box>
                <Typography variant='body2'>{user.name}</Typography>
                <Typography variant='body5'>{user.role.name}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isError}
        onClose={() => setIsError(false)}
        autoHideDuration={3000}
      >
        <Alert severity='error'>Sorry, error</Alert>
      </Snackbar>
    </Box>
  )
}
