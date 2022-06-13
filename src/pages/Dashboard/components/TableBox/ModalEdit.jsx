import { Modal , Backdrop, Fade, Typography, Button , Box} from '@mui/material'
import React from 'react'

import { CustomInput } from 'components'

export default function ModalEdit(props) {

    const {isOpen,handleClose} = props

  return (

    <Modal
    aria-labelledby = "modal-edit-title"
    aria-describedby = "modal-edit-description"
    open={isOpen}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout : 750,
    }}
    >

        <Fade in={isOpen}>

            <Box
            sx={{
                position: 'absolute',
                display : 'flex',
                flexDirection : 'column',
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
                variant='body1'
                id= "modal-edit-title"
                >Edit Appointment</Typography>

                <Button
                variant='contained'
                color='error'
                onClick={handleClose}
                >Cancel</Button>

            </Box>

        </Fade>

    </Modal>
  )

}
