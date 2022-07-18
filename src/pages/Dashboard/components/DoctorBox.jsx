import { Navigation, Autoplay } from 'swiper'

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'

import { toCapitalize } from '@/helpers/function/toCapitalize'

import doctorAvatar from '@/assets/image/avatar_doctor.jpg'

export default function DoctorBox(props) {
  const { doctor, isLoading } = props
  return (
    <Box>
      <Typography
        variant='h3'
        sx={{
          mb: '30px',
        }}
      >
        Today's Doctor
      </Typography>

      <Box>
        {!isLoading && doctor && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            autoplay
            breakpoints={{
              1200: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 2,
              },
            }}
            style={{
              padding: '10px 10px',
            }}
          >
            {doctor.map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{
                    bgcolor: 'neutral100',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='250px'
                      image={doctorAvatar}
                      alt={item.name + 'image'}
                      sx={{
                        width: '250px',
                        borderRadius: '4px',
                        marginBottom: '30px',
                      }}
                    />

                    <Typography
                      variant='body3'
                      sx={{
                        marginBottom: '10px',
                      }}
                    >
                      {toCapitalize(item.name)}
                    </Typography>

                    <Typography variant='body6'>
                      {toCapitalize(item.department.name)}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  )
}
