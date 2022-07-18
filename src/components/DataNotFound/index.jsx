import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import noDataImage from '@/assets/svg/noData.svg'

const DataNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '30px',
      }}
    >
      <img src={noDataImage} width={200} alt='No Data Found' />
      <Typography
        sx={{
          color: 'neutral700',
        }}
      >
        Oopss.. No Data in here
      </Typography>
    </Box>
  )
}

export default DataNotFound
