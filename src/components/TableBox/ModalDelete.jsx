import { Cancel, Delete } from '@mui/icons-material'
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import { deleteData } from 'api/delete'
import { useQueryClient } from 'react-query'

export default function ModalDelete(props) {
  const { isOpen, handleClose, deleteParams, endPoint } = props

  const queryClient = useQueryClient()

  const [openSnackbar, setOpenSnackbar] = useState({
    success: false,
    error: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleCloseModal = () => {
    handleClose()
  }

  const handleDeleteRow = async () => {
    setIsLoading(true)
    const { data, error } = await deleteData(endPoint, deleteParams)
    if (data) {
      handleClose()
      setOpenSnackbar((prev) => {
        return { ...prev, success: true }
      })
      queryClient.invalidateQueries(endPoint)
    }
    setOpenSnackbar((prev) => {
      return { ...prev, error: error }
    })
    setIsLoading(false)
  }

  return (
    <>
      <Modal
        aria-labelledby='modal-delete-title'
        aria-describedby='modal-delete-description'
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
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
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography
              id='modal-delete-title'
              sx={{
                marginBottom: '30px',
              }}
            >
              Are you sure to delete this row ?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Button
                variant='contained'
                startIcon={<Cancel />}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>

              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Button
                  variant='contained'
                  color='error'
                  endIcon={<Delete />}
                  onClick={handleDeleteRow}
                  disabled={isLoading}
                >
                  Delete
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar.success}
        onClose={() =>
          setOpenSnackbar((prev) => {
            return { ...prev, success: false }
          })
        }
        autoHideDuration={3000}
      >
        <Alert severity='success'>Row has been deleted</Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar.error}
        onClose={() =>
          setOpenSnackbar((prev) => {
            return { ...prev, error: false }
          })
        }
        autoHideDuration={3000}
      >
        <Alert severity='error'>Sorry, error</Alert>
      </Snackbar>
    </>
  )
}
