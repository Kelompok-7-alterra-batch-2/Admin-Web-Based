import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import EditIcon from '@mui/icons-material/Edit'

const NotesBox = () => {
  return (
    <Card
      sx={{
        width: '20%',
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
        <IconButton
          sx={{
            width: '20%',
          }}
        >
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default NotesBox
