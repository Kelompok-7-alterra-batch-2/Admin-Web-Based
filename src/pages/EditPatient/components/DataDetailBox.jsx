import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

import EditIcon from '@mui/icons-material/Edit'

const DataDetailBox = () => {
  return (
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
        <IconButton
          sx={{
            width: '11%',
            marginBottom: '80px',
          }}
        >
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default DataDetailBox
