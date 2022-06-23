import { CircularProgress, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'

const LoadingTable = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '30px',
      }}
    >
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{
          width: '100%',
          height: '50px',
        }}
      />
      <CircularProgress color='primary' />
      <Typography color='primary' variant='body1'>
        Please Wait...
      </Typography>
      <Skeleton
        variant='rectangular'
        animation='wave'
        sx={{
          width: '100%',
          height: '50px',
        }}
      />
    </Box>
  )
}

export default LoadingTable
