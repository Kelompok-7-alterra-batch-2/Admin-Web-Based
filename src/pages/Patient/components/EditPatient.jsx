import React, { useState } from 'react'

import { Box,  
  Avatar, 
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Divider } from '@mui/material'

import {
  SearchBox,
  TableBox,
  DefaultLayout,
  ModalInput,
  LoadingTable,
} from 'components'

import EditIcon from '@mui/icons-material/Edit';

export default function Edit() {

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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
                    alignItems: 'center'
                    
                  }}
                >
                  <Avatar
                    sx={{
                      height: '100px',
                      width: '100px',
                      color: 'primary.main',
                    }}
                  />
                  <Typography align="center"
                    sx={{
                      fontSize: '16px',
                      fontWeight: '600',
                      align: 'center'
                    }}
                  >
                    Wanda Scarlett
                  </Typography>
                  <Typography align="center"
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      align: 'center'
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
            }}>
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
                  fontSize:'14px',
                  fontWeight:'600'
                }}>
                  Gender
                </Typography>
                <Typography
                sx={{
                  fontSize:'14px',
                  fontWeight:'600',
                  marginTop:'10px'
                }}>
                  Female
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width:'100%',
                    marginTop:'10px'
                  }}
                />
                <Typography
                sx={{
                  fontSize:'14px',
                  fontWeight:'600',
                  marginTop:'10px'
                }}>
                  Address
                </Typography>
                <Typography
                sx={{
                  fontSize:'14px',
                  fontWeight:'600',
                  marginTop:'10px'
                }}>
                  Jl. Anggrek No.9, Jakarta Pusat, Jakarta
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width:'100%',
                    marginTop:'10px'
                  }}
                />
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
                }}>
                  Date Of Birth
                </Typography>
                <Typography
                sx={{
                  fontSize:'14px',
                  fontWeight:'600',
                  marginTop:'10px'
                }}>
                  15/08/1998
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width:'100%',
                    marginTop:'10px'
                  }}
                />
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
                }}>
                  Phone Number
                </Typography>
                <Typography
                sx={{
                  fontSize:'14px',
                  fontWeight:'600',
                  marginTop:'10px'
                }}>
                  081234567890
                </Typography>
                <Divider
                  sx={{
                    borderColor: 'black',
                    width:'100%',
                    marginTop:'10px'
                  }}
                />
              </Box>
              <CardActionArea
                sx={{
                  width:'11%',
                  marginBottom:'80px'
                }}>
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
            padding:'0 0 125px 0'
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
                fontSize:'16px',
                fontWeight:'600'
              }}>
                Notes / Allergic
              </Typography>
              <CardActionArea
                sx={{
                  width:'20%',
                  
                }}>
                <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'neutral100',
                  borderRadius: '4px',
                  padding:'10px'
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
          <Box
          sx={{
            display: 'flex',
            columnGap: '25px',
            alignItems: 'center',
            bgcolor: 'neutral400',
          }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Past Appointment" value='one'/>
              <Tab label="Upcoming Appointment" value='two'/>
            </Tabs>
          </Box>
        </Box>
      </DefaultLayout>
    </div>
  )
}
