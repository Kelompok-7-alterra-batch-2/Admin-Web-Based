import React from 'react'

import {Box, Modal , Backdrop, Fade, Typography, Button} from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function ModalSuccess(props) {

    const {isOpen,onClose} = props

    const navigate = useNavigate()

    const handleToAppoinment = () => {

        navigate('/appointment')   

    }

    const handleNotAppoinment = () =>{

        onClose()
        setTimeout(()=>{window.location.reload(false)}, 1000)

    }

  return (

    <Modal
    aria-labelledby = "modal-success-title"
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

                <Typography
                id = "modal-success-title"
                sx={{
                    marginBottom : '30px'
                }}
                >
                Data Successfully Added
                </Typography>

                <Box
                sx={{
                    display: 'flex',
                    columnGap : '30px'
                }}
                >

                    <Button
                    variant='contained'
                    onClick={handleToAppoinment}
                    sx={{
                        width : '50%'
                    }}
                    >
                        Make a appointment
                    </Button>

                    <Button
                    variant='contained'
                    onClick={handleNotAppoinment}
                    sx={{
                        width : '50%'
                    }}
                    >
                        No
                    </Button>

                </Box>

            </Box>

        </Fade>

    </Modal>
  )
}
