import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

import NoteAltIcon from '@mui/icons-material/NoteAlt'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

export default function OverviewBox(props) {
  const { doctor, appointment, isLoading, patient } = props

  const navigate = useNavigate()

  return (
    <Box>
      <Typography
        variant='h3'
        sx={{
          marginBottom: '30px',
        }}
      >
        Today's Overview
      </Typography>

      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            borderRadius: '8px',
            bgcolor: 'neutral100',
          }}
        >
          <CardActionArea
            onClick={() => {
              navigate('/appointment')
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
              <NoteAltIcon
                sx={{
                  height: '56px',
                  width: '56px',
                  color: 'primary.main',
                }}
              />

              <Typography variant='h3'>
                {appointment && !isLoading ? appointment.length : 0}
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              >
                Appoinments
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            width: '100%',
            borderRadius: '8px',
            bgcolor: 'neutral100',
          }}
        >
          <CardActionArea
            onClick={() => {
              navigate('/doctor')
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
              <PersonIcon
                sx={{
                  height: '56px',
                  width: '56px',
                  color: 'primary.main',
                }}
              />

              <Typography variant='h3'>
                {doctor && !isLoading ? doctor.length : 0}
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              >
                Doctors
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card
          sx={{
            width: '100%',
            borderRadius: '8px',
            bgcolor: 'neutral100',
          }}
        >
          <CardActionArea
            onClick={() => {
              navigate('/patient')
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                justifyContent: 'center',
                padding: '32px 0',
              }}
            >
              <AssignmentIndIcon
                sx={{
                  height: '56px',
                  width: '56px',
                  color: 'primary.main',
                }}
              />

              <Typography variant='h3'>
                {patient && !isLoading ? patient.length : 0}
              </Typography>

              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '700',
                }}
              >
                Patients
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  )
}
