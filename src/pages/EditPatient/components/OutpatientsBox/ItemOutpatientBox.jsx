import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { toCapitalize } from '@/helpers/function/toCapitalize'

const ItemOutpatientBox = (props) => {
  const { data, onClickDetail } = props

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '16px',
          justifyContent: 'space-between',
          padding: '32px',
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
            Date
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {data.date}
          </Typography>
        </Box>

        <Divider orientation='vertical' flexItem />

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
            Doctor
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {toCapitalize(data.doctor.name)}
          </Typography>
        </Box>

        <Divider orientation='vertical' flexItem />

        <Box>
          <Button
            onClick={onClickDetail}
            sx={{
              fontSize: '14px',
              fontWeight: '400',
            }}
            endIcon={<ChevronRightIcon />}
          >
            See details
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ItemOutpatientBox
