import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const AvatarBox = () => {
  return (
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
  )
}

export default AvatarBox
