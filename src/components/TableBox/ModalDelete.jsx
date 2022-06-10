import { Cancel, Delete } from '@mui/icons-material'
import { Modal , Backdrop, Fade, Typography, Button, Snackbar, Alert } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'

export default function ModalDelete(props) {

    const {isOpen,handleClose,deleteParams} = props

    const [openSnackbar,setOpenSnackbar] = useState(
        {
            success : false,
            error : false
        }
    )

    const handleCloseModal = () =>{

        handleClose()

    }

    const handleDeleteRow = () =>{

        // axios.delete(`https://62a18758cc8c0118ef4d691f.mockapi.io/patient/${deleteParams}`).then(()=>{

        //     handleClose()
        //     setOpenSnackbar((prev)=>{
        //         return {...prev,success : true}
        //     })
        //     setTimeout(()=>{window.location.reload(false)}, 1000)
        // }).catch(()=>{
        //     setOpenSnackbar((prev)=>{
        //         return {...prev,error : true}
        //     })
        // })

        console.log(deleteParams)

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
    open={openSnackbar.success}
    onClose={()=>setOpenSnackbar(false)}
    autoHideDuration={3000}
    >
        <Alert severity='success'>
            Row has been deleted
        </Alert>

    </Snackbar>

    <Snackbar
    anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
    open={openSnackbar.error}
    onClose={()=>setOpenSnackbar((prev)=>{return{...prev,error : false}})}
    autoHideDuration={3000}
    >
        <Alert severity='error'>
            Sorry, error
        </Alert>

    </Snackbar>

    </>
  )

}
