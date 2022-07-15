import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ArrowRight from '@mui/icons-material/ArrowForwardIos'
import { useState } from 'react'

import TabPanel from './TabPanel'

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const OutpatietsBox = () => {
  const [tab, setTab] = useState(0)

  const handleChange = (e, newTab) => {
    setTab(newTab)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
          bgcolor: 'neutral200',
        }}
      >
        <Tabs value={tab} onChange={handleChange}>
          <Tab label='Past Appointment' {...allyProps(0)} />
          <Tab label='Upcoming Appointment' {...allyProps(1)} />
        </Tabs>
      </Box>
     <TabPanel value={tab} index={0}>
      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            bgcolor: 'neutral200',
          }}
        >
          <Card
            sx={{
              width: '100%',
              borderRadius: '4px',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '16px',
                justifyContent: 'space-between',
                padding: '32px',
              }}
            >
              <Box
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Date
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  2 May 2022
                </Typography>
              </Box>

              <Box
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Queue
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  01
                </Typography>
              </Box>

              <Box
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Doctor
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  dr. Mantis Rachel, Sp.S
                </Typography>
              </Box>
              <Box sx={{}}>
                <Button endIcon={<ArrowRight />}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    See details
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
     </TabPanel>
     <TabPanel value={tab} index={1}>
     <p>Panel 2</p>
     </TabPanel>
    </>
  )
}

export default OutpatietsBox
