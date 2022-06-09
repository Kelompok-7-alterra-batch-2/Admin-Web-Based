import React, { useState } from 'react'

import { Modal , Backdrop, Fade, Typography, Button, Snackbar, Alert , Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton, InputLabel, NativeSelect} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import { CustomInput } from 'components'

import ModalSuccess from './ModalSuccess';

export default function ModalAddPatient(props) {

    const {isOpen,handleClose} = props

    const initialFormPatient = {
        name : "",
        dob : undefined,
        gender : "P",
        phone_number : "",
        blood_type : "A",
        city : "",
        address : ""
    }

    const [formPatient,setFormPatient] = useState(initialFormPatient)

    const [isSuccess,setIsSuccess] = useState(false)

    const [isError,setIsError] = useState(false)

    const handleCloseModal = () =>{

        handleClose()
        setFormPatient(initialFormPatient)

    }

    const handleChangeName = (e) => {

        setFormPatient((prev)=>{
            return {
                ...prev,
                name : e
            }
        })

    }

    const handleChangeDOB = (e) => {

        setFormPatient((prev)=>{
            return {
                ...prev,
                dob : e
            }
        })

    }

    const handleChangeGender = (e) => {

        setFormPatient((prev)=>{
            return {
                ...prev,
                gender : e.target.value
            }
        })

    }

    const handleChangePhone = (e) =>{

        setFormPatient((prev)=>{

            return {
                ...prev,
                phone_number : e
            }

        })

    }

    const handleChangeBlood = (e) =>{

        setFormPatient((prev)=>{

            return {
                ...prev,
                blood_type : e.target.value
            }

        })

    }

    const handleChangeCity = (e) =>{

        setFormPatient((prev)=>{

            return {
                ...prev,
                city : e
            }

        })

    }

    const handleChangeAddress = (e) =>{

        setFormPatient((prev)=>{

            return {
                ...prev,
                address : e
            }

        })

    }


    const handleSubmitPatient = (e) =>{

        axios.post('https://62a18758cc8c0118ef4d691f.mockapi.io/patient',{
            name : formPatient.name,
            gender : formPatient.gender,
            dob : formPatient.dob,
            blood_type : formPatient.blood_type,
            phone_number : formPatient.phone_number,
            city : formPatient.city,
            address : formPatient.address
        }).then(()=>{
            
            handleCloseModal()
            setIsSuccess(true)

        }).catch((err)=>{
            setIsError(true)
        })

    }

  return (
    
    <>

    <Modal
    aria-labelledby = "modal-add-patient-title"
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
                    position : 'relative'
                }}
                >

                    <IconButton 
                    onClick={handleCloseModal}
                    aria-label='close-modal'
                    sx={{
                        right : '0',
                        position : 'absolute',
                        transform : 'translateY(-15%)'
                    }}
                    >

                        <CloseIcon/>

                    </IconButton>
                
                    <Typography
                    id = "modal-add-patient-title"
                    sx={{
                        marginBottom : '30px'
                    }}
                    >
                    New Patient
                    </Typography>

                </Box>

                <Box
                sx={{
                    display: 'flex',
                    justifyContent : 'space-around',
                    flexDirection : 'column',
                    rowGap : '30px'
                }}
                >

                    <CustomInput
                    value={formPatient.name}
                    label='Name'
                    onChange={handleChangeName}
                    type='text'
                    />

                    <CustomInput
                    value={formPatient.dob}
                    label='Date of Birth'
                    onChange={handleChangeDOB}
                    type='date'
                    />

                    <FormControl>

                        <FormLabel 
                        id="gender-radio-button-group-label"
                        sx={{
                            textAlign : 'left',
                            fontSize : '16px'
                        }}
                        >
                            Gender
                        </FormLabel>

                        <RadioGroup
                        aria-labelledby="gender-radio-button-group-labe"
                        name="radio-buttons-group"
                        value={formPatient.gender}
                        onChange={handleChangeGender}
                        >

                            <FormControlLabel
                            value="Male"
                            control={<Radio/>}
                            label="Male"
                            />

                            <FormControlLabel
                            value="Female"
                            control={<Radio/>}
                            label="Female"
                            />
                        
                        </RadioGroup>
                        
                    </FormControl>

                    <CustomInput
                    value={formPatient.phone_number}
                    label = 'Phone Number'
                    onChange={handleChangePhone}
                    />

                    <FormControl fullWidth>

                        <InputLabel
                        labelId="select-blood-type" 
                        variant='standard'
                        >
                            Blood Type
                        </InputLabel>

                        <NativeSelect
                        labelId="select-blood-type"
                        id="select-blood-type"
                        value={formPatient.blood_type}
                        onChange={handleChangeBlood}
                        >

                            <option
                            value="A">
                                A
                            </option>

                            <option
                            value="AB"
                            >
                                AB
                            </option>

                            <option
                            value="B"
                            >
                                B
                            </option>

                            <option
                            value="O"
                            >
                                O
                            </option>

                        </NativeSelect>

                    </FormControl>

                    <CustomInput
                    label="City"
                    value={formPatient.city}
                    onChange={handleChangeCity}
                    />

                    <CustomInput
                    label="Address"
                    value={formPatient.address}
                    onChange={handleChangeAddress}
                    />

                    <Button
                    variant='contained'
                    onClick={handleSubmitPatient}
                    >Submit
                    </Button>

                </Box>

            </Box>

        </Fade>

    </Modal>

    <ModalSuccess
    isOpen={isSuccess}
    onClose={()=>setIsSuccess(false)}
    />

    <Snackbar
    anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
    open={isError}
    onClose={()=>setIsError(false)}
    autoHideDuration={3000}
    >
        <Alert severity='error'>
            Sorry, error
        </Alert>

    </Snackbar>

    </>
  )
}
