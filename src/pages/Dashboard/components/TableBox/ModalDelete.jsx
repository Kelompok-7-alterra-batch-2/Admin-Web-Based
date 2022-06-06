import { Cancel, Delete } from '@mui/icons-material'
import { Modal , Backdrop, Fade, Typography, Button, Snackbar, Alert } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export default function ModalDelete(props) {

    const {isOpen,handleClose} = props

    const [openSnackbar,setOpenSnackbar] = useState(false)

    const handleCloseModal = () =>{

        handleClose()

    }

    const handleDeleteRow = () =>{

        handleClose()
        setOpenSnackbar(true)

    }

  return (

    <>

    <Modal
    aria-labelledby = "modal-delete-title"
    aria-describedby = "modal-delete-description"
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
                id = "modal-delete-title"
                sx={{
                    marginBottom : '30px'
                }}
                >
                Are you sure to delete this row ? 
                </Typography>

                <Box
                sx={{
                    display: 'flex',
                    justifyContent : 'space-around'
                }}
                >

                    <Button
                    variant='contained'
                    startIcon={<Cancel/>}
                    onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>

                    <Button
                    variant='contained'
                    color='error'
                    endIcon={<Delete/>}
                    onClick={handleDeleteRow}
                    >
                        Delete
                    </Button>

                </Box>

            </Box>

        </Fade>

    </Modal>

    <Snackbar
    anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
    open={openSnackbar}
    onClose={()=>setOpenSnackbar(false)}
    autoHideDuration={3000}
    >
        <Alert severity='success'>
            Row has been deleted
        </Alert>

    </Snackbar>

    </>
  )

}
