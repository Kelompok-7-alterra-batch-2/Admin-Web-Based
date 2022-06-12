import React,{useState} from 'react'

import {Box, Modal , Backdrop, Fade, Typography, Button, Divider } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import IconConfirm from 'assets/svg/ConfirmIcon.svg'

import { ModalInput } from 'components'

export default function ModalConfirm(props) {

    const {isOpen,handleClose} = props

    const field = [
    {
        title : 'Patient',
        fieldname : 'patient',
        type : 'search'
    },
    {
        title : 'Department',
        fieldname : 'department',
    },
    {
        title : 'Appointment Date',
        fieldname : 'date',
        type : 'date'
    },
    {
        title : 'Appointment Time',
        fieldname : 'time',
        type : 'time'
    },
    {
        title : 'Doctor',
        fieldname : 'doctor',
    },
    {
        title : 'Appointment Reason',
        fieldname : 'reason',
        type : 'area',
        rows : 3
    }
    ]

    const initialData = {
        patient : '',
        department : '',
        date : '',
        time : '',
        doctor : '',
        reason : '',
        status : 'pending'
    }

    const [openAppointment,setOpenAppointment ] = useState(false)

    const navigate = useNavigate()

    const handleOpenAppointment = () => {
        
        handleClose()
        setOpenAppointment(true)

    }

    const handleToPatient = () =>{

        navigate('/patient')

    }

  return (

    <>

    <Modal
    aria-labelledby = "modal-confirmation-title"
    aria-describedby = "modal-confirmation-description"
    open={isOpen}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout : 500,
    }}
    >

        <Fade in={isOpen}>

            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 472,
                bgcolor: 'white',
                boxShadow: 24,
                p: '30px',
                borderRadius : '8px',
                textAlign : 'center'
            }}
            >
                
                <Box
                sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center',
                    rowGap : '10px'
                }}
                >

                    <img src={IconConfirm} alt='Icon Confirmation'/>

                    <Typography
                    id = "modal-confirmation-title"
                    sx={{
                        marginBottom : '30px'
                    }}
                    variant="body0"
                    >
                    Confirmation
                    </Typography>
                
                </Box>

                <Divider
                sx={{
                    marginBottom : '30px'
                }}
                />

                <Typography
                id = "modal-confirmation-description"
                variant='body4'
                >
                Has the patient been registered ?
                </Typography>

                <Box
                sx={{
                    display: 'flex',
                    columnGap : '30px',
                    marginTop : '30px'
                }}
                >

                    <Button
                    variant='contained'
                    onClick={handleOpenAppointment}
                    sx={{
                        width : '50%'
                    }}
                    >
                        Yes
                    </Button>

                    <Button
                    onClick={handleToPatient}
                    sx={{
                        width : '50%'
                    }}
                    variant='outlined'
                    >
                        No
                    </Button>

                </Box>

            </Box>

        </Fade>

    </Modal>
    
    <ModalInput
    isOpen={openAppointment}
    handleClose={()=>{setOpenAppointment(false)}}
    field={field}
    initialData={initialData}
    title='New Appointment'
    endPoint='appointment'
    methodSubmit='post'
    />

    </>

  )
}
