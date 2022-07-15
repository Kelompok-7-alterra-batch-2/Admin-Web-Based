import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const AvatarBox = (props) => {
  const { onChange, name, data, isError, isEdit } = props

  const nameRegex = /[A-Za-z'.,\s]$/

  const handleChange = (e) => {
    if (e.target.value === '') {
      return onChange(e)
    }
    if (!nameRegex.test(e.target.value)) {
      return
    }
    onChange(e)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '20%',
        borderRadius: '4px',
        bgcolor: 'neutral200',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
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
          <TextField
            error={isError}
            sx={{
              display: 'block',
              m: 'auto',
            }}
            name='name'
            variant='standard'
            value={name}
            onChange={handleChange}
            disabled={!isEdit}
            helperText={isError ? 'Name Cant Empty' : ''}
          />
          <Typography
            align='center'
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              align: 'center',
            }}
          >
            {data ? data.id : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AvatarBox
