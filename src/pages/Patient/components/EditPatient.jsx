import { useState } from 'react'

import {
  Box,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Divider,
  Button } from '@mui/material'

import {
  SearchBox,
  TableBox,
  DefaultLayout,
  ModalInput,
  LoadingTable,
} from '@/components'

import EditIcon from '@mui/icons-material/Edit';
import ArrowRight from '@mui/icons-material/ArrowForwardIos';
import NoteAdd from '@mui/icons-material/NoteAdd';

export default function Edit() {
  const [value, setValue] = useState('one')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <DefaultLayout>
        <Box
          sx={{
            display: 'flex',
            columnGap: '25px',
            alignItems: 'center',
            bgcolor: 'neutral100',
          }}
        >
          <Card
            sx={{
              width: '20%',
              borderRadius: '4px',
              bgcolor: 'neutral200',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '16px',
                justifyContent: 'center',
                padding: '32px 0',
              }}
            >
              <Box
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    height: '100px',
                    width: '100px',
                    color: 'primary.main',
                  }}
                />
                <Typography
                  align='center'
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                    align: 'center',
                  }}
                >
                  Wanda Scarlett
                </Typography>
                <Typography
                  align='center'
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    align: 'center',
                  }}
                >
                  123456
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: '60%',
              borderRadius: '4px',
              bgcolor: 'neutral200',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'left',
                columnGap: '16px',
                justifyContent: 'center',
                padding: '32px 0',
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
                  Gender
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginTop: '10px',
                  }}
                >
                  Female
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width: '100%',
                    marginTop: '10px',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginTop: '10px',
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginTop: '10px',
                  }}
                >
                  Jl. Anggrek No.9, Jakarta Pusat, Jakarta
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width: '100%',
                    marginTop: '10px',
                  }}
                />
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
                  Date Of Birth
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginTop: '10px',
                  }}
                >
                  15/08/1998
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width: '100%',
                    marginTop: '10px',
                  }}
                />
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
                  Phone Number
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginTop: '10px',
                  }}
                >
                  081234567890
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width: '100%',
                    marginTop: '10px',
                  }}
                />
              </Box>
              <CardActionArea
                sx={{
                  width: '11%',
                  marginBottom: '80px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'neutral100',
                    borderRadius: '4px',
                    padding: '20px',
                  }}
                >
                  <EditIcon></EditIcon>
                </Box>
              </CardActionArea>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: '25%',
              borderRadius: '4px',
              bgcolor: 'neutral200',
              padding: '0 0 125px 0',
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
                Notes / Allergic
              </Typography>
              <CardActionArea
                sx={{
                  width: '20%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'neutral100',
                    borderRadius: '4px',
                    padding: '10px',
                  }}
                >
                  <EditIcon></EditIcon>
                </Box>
              </CardActionArea>
            </CardContent>
          </Card>
        </Box>

        <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
          bgcolor: 'neutral100',
          marginTop: '50px',
          padding: '10px'
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
            width:'100%',
          }}>  
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width:'100%',
              bgcolor: 'neutral200',
            }}>
              <Card
              sx={{
                width: '100%',
                borderRadius: '4px',
                }}>
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
                      alignItems: 'center'
                      
                    }}
                    >
                      <Typography
                      sx={{
                        fontSize:'14px',
                        fontWeight:'600'
                      }}
                      >
                        Date
                      </Typography>
                      <Typography
                      sx={{
                        fontSize:'16px',
                        fontWeight:'600'
                      }}
                      >
                        2 May 2022
                      </Typography>
                    </Box>

                    <Box
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'center'
                      
                    }}
                    >
                      <Typography
                      sx={{
                        fontSize:'14px',
                        fontWeight:'600'
                      }}
                      >
                        Queue
                      </Typography>
                      <Typography
                      sx={{
                        fontSize:'16px',
                        fontWeight:'600'
                      }}
                      >
                        01
                      </Typography>
                    </Box>

                    <Box
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'center'
                      
                    }}
                    >
                      <Typography
                      sx={{
                        fontSize:'14px',
                        fontWeight:'600'
                      }}
                      >
                        Doctor
                      </Typography>
                      <Typography
                      sx={{
                        fontSize:'16px',
                        fontWeight:'600'
                      }}
                      >
                        dr. Mantis Rachel, Sp.S
                      </Typography>
                    </Box>
                    <Box
                    sx={{
                    
                    }}>
                      <Button
                      endIcon={<ArrowRight/>}> 
                        <Typography
                        sx={{
                          fontSize:'14px',
                          fontWeight:'400',
                        }}>
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
              width:'30%',
              bgcolor: 'neutral200',
            }}>
              <Card
                sx={{
                  width: '100%',
                  borderRadius: '4px',
                  }}>
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
                      fontSize:'16px',
                      fontWeight:'600'
                    }}>
                      Documents
                    </Typography>
                    <Button
                      startIcon={<NoteAdd/>}> 
                        <Typography
                        sx={{
                          fontSize:'14px',
                          fontWeight:'400',
                        }}>
                          Add file
                        </Typography>
                      </Button>
                  </CardContent>
                </Card>
            </Box>
          </Box> 
      </DefaultLayout>
    </div>
  )
}
