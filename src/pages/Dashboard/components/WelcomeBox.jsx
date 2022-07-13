import moment from 'moment'

import { Box, Typography, Divider } from '@mui/material'

import BgWelcome from '@/assets/image/bg_welcome.jpg'

export default function WelcomeBox(props) {
  const { user, isLoading } = props

  return (
    <Box
      sx={{
        backgroundImage: `url(${BgWelcome})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: '75px',
          background:
            'linear-gradient(89.89deg, #4E89A8 6.63%, #00000000 105.65%)',
          borderRadius: '8px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            color: 'white',
            flexDirection: 'column',
            rowGap: '10px',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h3'>
              {moment().format('MMMM[ ]DD[, ]YYYY')}
            </Typography>

            <Typography variant='body1'>Welcome</Typography>
          </Box>
          <Typography variant='h3'>
            {user && !isLoading && user !== undefined ? user.name : ''}
          </Typography>

          <Divider
            sx={{
              borderColor: 'white',
            }}
          />

          <Typography variant='body1'>Stay safe and wash your hand</Typography>
        </Box>
      </Box>
    </Box>
  )
}
