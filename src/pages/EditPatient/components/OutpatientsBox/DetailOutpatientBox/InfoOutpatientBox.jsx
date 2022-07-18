import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import { toCapitalize } from '@/helpers/function/toCapitalize'

const InfoOutpatientBox = (props) => {
  const { date, doctor } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: '20px',
          alignItems: 'center',
        }}
      >
        <CalendarMonthIcon
          fontSize='small'
          sx={{
            color: 'neutral700',
          }}
        />
        <Typography
          sx={{
            color: 'neutral700',
          }}
          variant='body6'
        >
          {date}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          columnGap: '20px',
          alignItems: 'center',
        }}
      >
        <PersonOutlineIcon
          fontSize='small'
          sx={{
            color: 'neutral700',
          }}
        />
        <Typography
          sx={{
            color: 'neutral700',
          }}
          variant='body6'
        >
          {toCapitalize(doctor)}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoOutpatientBox
