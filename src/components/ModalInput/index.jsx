import React,{useState} from 'react'

import {
    Paper, 
    Modal , 
    Backdrop, 
    Fade, 
    Typography, 
    Button, 
    Snackbar, 
    Alert , 
    Box, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    IconButton,
    Select, 
    CircularProgress, 
    List, 
    ListItem, 
    ListItemButton,
    MenuItem} from '@mui/material'

import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search'

import { CustomInput } from 'components'

import ModalSuccess from './ModalSuccess';

export default function ModalInput(props) {

    const {isOpen,handleClose,field,initialData,title,endPoint} = props

    const [form,setForm] = useState(initialData)

    const [isSuccess,setIsSuccess] = useState(false)

    const [isError,setIsError] = useState(false)

    const [isLoading,setIsLoading] = useState(false)

    const [listDoctor,setListDoctor] = useState(null)

    const [listPatient,setListPatient] = useState(null)

    const [openPopper,setOpenPopper] = useState(false)

    const handleCloseModal = () =>{

        handleClose()

    }

    const handleChange = (e) => {

        setForm((prev)=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })

    }

    const handleSearch = (param) => {

        axios({
            method : 'get',
            url : ('https://62a18758cc8c0118ef4d691f.mockapi.io/' + param + '/' + form.patient),
            data : {},
            headers : {
              'Content-Type' : 'application/json'
            }
          }).then((res)=>{

            setOpenPopper(true)

            setListPatient([res.data])

          })

    }

    const handleCancelSearch = () => {

        setOpenPopper(false)
        setListPatient(null)

    }

    const handleSubmitSearch = (e) => {

        setForm((prev)=>{
            return {
                ...prev,
                patient : e
            }
        })

        setOpenPopper(false)

    }

    const handleChangeDepartment = (e) => {

        axios({
            method : 'get',
            url : 'https://62a18758cc8c0118ef4d691f.mockapi.io/doctor',
            data : {},
            headers : {
              'Content-Type' : 'application/json'
            }
          }).then((res)=>{

            setListDoctor(res.data)

            setForm((prev)=>{

                return {
                    ...prev,
                    [e.target.name] : e.target.value
                }
    
            })

          })

    }

    const handleSubmit = async () =>{
        
        setIsLoading(true)
        await axios.post(`https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}`,{
            ...form
        }).then(()=>{
            
            handleCloseModal()
            setIsSuccess(true)

        }).catch((err)=>{
            setIsError(true)
        })
        setIsLoading(false)

    }

  return (
    
    <>
        
        <Modal
        aria-labelledby = "modal-input-title"
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
                    borderRadius : '8px'
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
                        id = "modal-input-title"
                        sx={{
                            marginBottom : '30px',
                            textAlign : 'center'
                        }}
                        >
                        {title}
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

                        {field.map((item,index)=>{

                        if(item.type === 'search') {
                            
                            return (
                                
                                <Box
                                key={index}
                                sx={{
                                    position : 'relative',
                                }}
                                >
                                
                                    <CustomInput
                                    name={item.fieldname}
                                    value={form[item.fieldname]}
                                    label={item.title}
                                    onChange={handleChange}
                                    type='text'
                                    multiline={false}
                                    endAdornment={
                                        <IconButton
                                        onClick={()=>{handleSearch(item.fieldname)}}
                                        >
                                            <Search/>
                                        </IconButton>
                                    }
                                    />
                                    
                                    {openPopper &&
                                    <Paper
                                    sx={{
                                        position : 'absolute',
                                        width : '100%',
                                        zIndex : 1,
                                        padding : '5px'
                                    }}
                                    >
                                        <List>
                                            {listPatient &&
                                                listPatient.map((itemPop,index)=>(
                                                    <ListItem
                                                    key={index}
                                                    >

                                                        <ListItemButton
                                                        onClick={()=>handleSubmitSearch(itemPop.name)}
                                                        sx={{
                                                            display : 'flex',
                                                            flexDirection : 'column',
                                                            boxShadow : '1',
                                                            my : '5px',
                                                            alignItems : 'baseline'
                                                        }}
                                                        >

                                                            <Typography
                                                            variant='body2'
                                                            >
                                                                {itemPop.name}
                                                            </Typography>

                                                            <Typography
                                                            variant='body7'
                                                            >
                                                                {itemPop.address}
                                                            </Typography>

                                                        </ListItemButton>

                                                    </ListItem>
                                                ))
                                            }
                                        </List>

                                        <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={handleCancelSearch}
                                        size='small'
                                        sx={{
                                            float : 'right'
                                        }}
                                        >
                                            Cancel
                                        </Button>
                                    
                                    </Paper>}

                                </Box>
  
                            )
                            
                        }

                        if(item.fieldname === 'department') {

                            return (

                                <FormControl
                                key={index}
                                fullWidth>


                                    <Typography
                                    sx={{
                                        fontSize : '14px',
                                        fontWeight : 'normal'
                                    }}
                                    >
                                    {item.title}
                                    </Typography>

                                    <Select
                                    name={item.fieldname}
                                    value={form[item.fieldname]}
                                    onChange={handleChangeDepartment}
                                    size='small'
                                    >
                                        
                                        <MenuItem
                                        disabled
                                        value=''>
                                            None
                                        </MenuItem>

                                        <MenuItem
                                        value='general'
                                        >
                                            General
                                        </MenuItem>

                                        <MenuItem
                                        value='neurology'
                                        >
                                            Neurology
                                        </MenuItem>

                                        <MenuItem
                                        value='cardiology'
                                        >
                                            Cardiology
                                        </MenuItem>

                                        <MenuItem
                                        value='pediatric'
                                        >
                                            Pediatric
                                        </MenuItem>

                                        <MenuItem
                                        value='gynecology'
                                        >
                                            Gynecology
                                        </MenuItem>

                                    </Select>

                                </FormControl>

                            )

                        }

                        if(item.fieldname === 'doctor') {

                            return (

                                <FormControl 
                                key={index}
                                fullWidth>

                                    <Typography
                                    sx={{
                                        fontSize : '14px',
                                        fontWeight : 'normal'
                                    }}
                                    >
                                    {item.title}
                                    </Typography>

                                    <Select
                                    name={item.fieldname}
                                    value={form[item.fieldname]}
                                    onChange={handleChangeDepartment}
                                    size='small'
                                    >   
                                        
                                        <MenuItem
                                        value=''>
                                            None
                                        </MenuItem>

                                        { listDoctor &&
                                            listDoctor.map((option,indexDoctor)=>(

                                                <MenuItem
                                                key={indexDoctor}
                                                value={option.name}>
                                                    {option.name}
                                                </MenuItem>

                                            ))
                                        }

                                    </Select>

                                </FormControl>

                            )

                        }

                        if (item.type === 'area'){

                            return (
                            <Box
                            key={index}
                            >

                                <CustomInput
                                value={form[item.fieldname]}
                                name={item.fieldname}
                                label={item.title}
                                onChange={handleChange}
                                type={item.type}
                                multiline={true}
                                rows={item.rows}
                                />
                            
                            </Box>
                            )
                        }

                        if (item.type === 'select') {

                            return (

                                <FormControl 
                                key={index}
                                fullWidth>

                                    <Typography
                                    sx={{
                                        fontSize : '14px',
                                        fontWeight : 'normal'
                                    }}
                                    >
                                    {item.title}
                                    </Typography>

                                    <Select
                                    name={item.fieldname}
                                    value={form[item.fieldname]}
                                    onChange={handleChange}
                                    size='small'
                                    >   
                                        
                                        <MenuItem
                                        value=''>
                                            None
                                        </MenuItem>

                                        {item.option.map((option,indexSelect)=>(

                                                <MenuItem
                                                key={indexSelect}
                                                value={option.name}>
                                                    {option.name}
                                                </MenuItem>

                                            ))
                                        }

                                    </Select>

                                </FormControl>

                            )

                        }

                        if (item.type === 'radio') {

                            return (

                                <FormControl>

                                    <FormLabel 
                                    id="radio-button-group-label"
                                    sx={{
                                        textAlign : 'left',
                                        fontSize : '16px'
                                    }}
                                    >
                                        Gender
                                    </FormLabel>

                                    <RadioGroup
                                    aria-labelledby="radio-button-group-label"
                                    name={item.fieldname}
                                    value={form[item.fieldname]}
                                    onChange={handleChange}
                                    >

                                        {item.option.map((option,indexRadio)=>(

                                            <FormControlLabel
                                            key={indexRadio}
                                            value={option.value}
                                            control={<Radio/>}
                                            label={option.title}
                                            />

                                        ))}
                                    
                                    </RadioGroup>
                                    
                                </FormControl>

                            )

                        }

                        return (
                            
                            <Box
                            key={index}
                            >

                                <CustomInput
                                value={form[item.fieldname]}
                                name={item.fieldname}
                                label={item.title}
                                onChange={handleChange}
                                type={item.type}
                                multiline={false}
                                />
                            
                            </Box>
                        )
                        })}

                        <Box
                        sx={{
                            position : 'relative'
                        }}
                        >

                            <Button
                            disabled={isLoading}
                            variant='contained'
                            onClick={handleSubmit}
                            fullWidth
                            >Submit
                            </Button>

                            {isLoading &&
                            
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

                            }
                        
                        </Box>

                    </Box>

                </Box>

            </Fade>

        </Modal>

        <ModalSuccess
        isOpen={isSuccess}
        onClose={()=>setIsSuccess(false)}
        descTitle={title}
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
