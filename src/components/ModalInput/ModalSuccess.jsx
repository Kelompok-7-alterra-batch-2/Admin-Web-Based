import React from 'react'

import {Box, Modal , Backdrop, Fade, Typography, Button} from '@mui/material'

import SuccessIcon from 'assets/svg/SuccessIcon.svg'

export default function ModalSuccess(props) {

    const {isOpen,onClose,descTitle} = props

    const handleDone = () =>{

        onClose()
        setTimeout(()=>{window.location.reload(false)}, 1000)

    }

  return (

    <Modal
    aria-labelledby = "modal-success-title"
    aria-describedby = "modal-success-description"
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

                    <img src={SuccessIcon} alt='Icon Confirmation'/>
                   
                    <Typography
                    id = "modal-success-title"
                    sx={{
                        marginBottom : '30px'
                    }}
                    >
                    Successfully Added
                    </Typography>
                
                </Box>

                <Typography
                id = "modal-success-description"
                variant='body4'
                >
                {descTitle} has been added
                </Typography>

                <Box
                sx={{
                    display: 'flex',
                    justifyContent : 'center'
                }}
                >

                    <Button
                    variant='contained'
                    onClick={handleDone}
                    sx={{
                        width : '50%'
                    }}
                    >
                        Done
                    </Button>

                </Box>

            </Box>

        </Fade>

    </Modal>
  )
}
