import { useState } from 'react'

import { Box, Card, CardContent, Typography, Button } from '@mui/material'

import ArrowRight from '@mui/icons-material/ArrowForwardIos'
import NoteAdd from '@mui/icons-material/NoteAdd'

import PersonalDataBox from './components/PersonalDataBox'

export default function EditPatient() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
          bgcolor: 'neutral100',
        }}
      >
        <PersonalDataBox />
      </Box>

      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
          bgcolor: 'neutral100',
          marginTop: '50px',
          padding: '10px',
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            columnGap: '25px',
            alignItems: 'center',
            bgcolor: 'neutral200',
          }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label='Past Appointment' value='one' />
              <Tab label='Upcoming Appointment' value='two' />
            </Tabs>
          </Box> */}
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

        <Box
          sx={{
            display: 'flex',
            columnGap: '25px',
            alignItems: 'center',
            width: '30%',
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
                alignItems: 'left',
                columnGap: '16px',
                justifyContent: 'center',
                padding: '10px 0 0 0',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                Documents
              </Typography>
              <Button startIcon={<NoteAdd />}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  Add file
                </Typography>
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  )
}
