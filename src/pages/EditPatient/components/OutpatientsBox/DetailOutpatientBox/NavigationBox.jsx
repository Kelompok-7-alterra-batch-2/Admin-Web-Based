import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const NavigationBox = (props) => {
  const { onBack, isEdit, onChangeMode, onCancel, onSubmit } = props

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={onBack}
        sx={{
          fontSize: '14px',
          fontWeight: '400',
        }}
        startIcon={<ChevronLeftIcon />}
      >
        Back
      </Button>
      <Box>
        {!isEdit && (
          <IconButton
            sx={{
              borderRadius: '10px',
              backgroundColor: 'neutral100',
              padding: '14px 16px',
            }}
            onClick={onChangeMode}
          >
            <EditIcon />
          </IconButton>
        )}
        {isEdit && (
          <Box
            sx={{
              display: 'flex',
              columnGap: '20px',
            }}
          >
            <IconButton
              sx={{
                borderRadius: '10px',
                backgroundColor: 'neutral100',
                padding: '14px 16px',
                color: 'error.main',
              }}
              onClick={onCancel}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: '10px',
                backgroundColor: 'neutral100',
                padding: '14px 16px',
                color: 'success.main',
              }}
              onClick={onSubmit}
            >
              <CheckIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default NavigationBox
