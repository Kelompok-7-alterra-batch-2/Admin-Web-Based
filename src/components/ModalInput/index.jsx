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
    MenuItem,
    FormHelperText} from '@mui/material'

import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search'

import { CustomInput } from 'components'

import ModalSuccess from './ModalSuccess';

export default function ModalInput(props) {

    const {isOpen,handleClose,field,initialData,title,endPoint,methodSubmit} = props

    const initialError = {
        search : false,
        submit : false,
        selectDoctor : false
    }

    const [form,setForm] = useState(initialData)

    const [isSuccess,setIsSuccess] = useState(false)

    const [isError,setIsError] = useState(initialError)

    const [isLoading,setIsLoading] = useState({
        search : false,
        submit : false
    })

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

    const handleSearch = async(param) => {

        setIsLoading((prev)=>{
            return {...prev,search : true}
        })
        await axios({
            method : 'get',
            url : ('https://62a18758cc8c0118ef4d691f.mockapi.io/' + param + '?search=' + form.patient),
            data : {},
            headers : {
              'Content-Type' : 'application/json'
            }
          }).then((res)=>{

            setOpenPopper(true)

            setListPatient(res.data)

          }).catch(()=>{

            setIsError((prev)=>{ return {...prev,search : true}})

          })

        setIsLoading((prev)=>{
            return {...prev,search : false}
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
            url : `https://62a18758cc8c0118ef4d691f.mockapi.io/doctor?filter=${e.target.value}`,
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

          }).catch(()=>{

            setIsError((prev)=>{
                return {
                    ...prev,
                    selectDoctor : true
                }
            })

          })

    }

    const handleSubmit = async () =>{
        
        setIsLoading((prev)=>{
            return {...prev,submit : true}
        })
        await axios({
            method : methodSubmit,
            url : methodSubmit === 'put' ? 
            `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}/${form.id}` : 
            `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}`,
            data : {
            ...form },
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(()=>{
            
            setIsSuccess((prev)=>{return !prev})

        }).catch(()=>{
            setIsError((prev)=>{ return {...prev,submit : true}})
        })
        setIsLoading((prev)=>{
            return {...prev,submit : false}
        })

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
                    borderRadius : '8px',
                }}
                >

                    <Box
                    sx={{
                        position : 'relative',
                        p: '30px 30px 0 30px',
                    }}
                    >

                        <IconButton 
                        onClick={handleCloseModal}
                        aria-label='close-modal'
                        sx={{
                            right : '0',
                            position : 'absolute',
                            transform : 'translate(-50%,-15%)'
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
                        justifyContent : 'flex-start',
                        flexDirection : 'column',
                        rowGap : '30px',
                        maxHeight : '400px',
                        overflowY : 'scroll',
                        px : '30px' 
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
                                        <Box>
                                            <IconButton
                                            onClick={()=>{handleSearch(item.fieldname)}}
                                            sx={{
                                                position : 'relative'
                                            }}
                                            >
                                                <Search/>

                                                {isLoading.search &&
                            
                                                <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: 'primary.main',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                                />}

                                            </IconButton>

                                        </Box>
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
                                            {(listPatient && listPatient.length > 0) &&
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

                                        {(isError.search || listPatient.length === 0) &&
                                            <Typography
                                            sx={{
                                                textAlign : 'center',
                                                color : 'neutral500'
                                            }}
                                            variant='body2'>
                                                {form[item.fieldname]} isn't in database
                                            </Typography>
                                        }

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
                                fullWidth
                                error={isError.selectDoctor || (listDoctor && listDoctor.length === 0)}
                                >


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
                                    sx={{
                                        fontSize : '16px',
                                        fontWeight : 'normal'
                                    }}
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

                                    {(isError.selectDoctor || (listDoctor && listDoctor.length === 0)) &&
                                    <FormHelperText>
                                        No doctor from {form[item.fieldname]} available at this time
                                    </FormHelperText>}

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
                                    sx={{
                                        fontSize : '16px',
                                        fontWeight : 'normal'
                                    }}
                                    >   
                                        
                                        <MenuItem
                                        value=''>
                                            None
                                        </MenuItem>

                                        {(initialData.department && 
                                        (initialData.department !== '' || initialData.department !== null)) &&

                                        <MenuItem
                                        value={initialData.doctor}>
                                            {initialData.doctor}
                                        </MenuItem>

                                        }

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
                                    sx={{
                                        fontSize : '16px',
                                        fontWeight : 'normal'
                                    }}
                                    >   
                                        
                                        <MenuItem
                                        value=''>
                                            None
                                        </MenuItem>

                                        {item.option.map((option,indexSelect)=>(

                                                <MenuItem
                                                key={indexSelect}
                                                value={option.value}>
                                                    {option.title}
                                                </MenuItem>

                                            ))
                                        }

                                    </Select>

                                </FormControl>

                            )

                        }

                        if (item.type === 'radio') {

                            return (

                                <FormControl
                                key={index}
                                >

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

                    </Box>

                    <Box
                    px={{
                      padding : '30px'
                    }}
                    >

                        <Box
                        sx={{
                            position : 'relative'
                        }}
                        >

                            <Button
                            disabled={isLoading.submit}
                            variant='contained'
                            onClick={handleSubmit}
                            fullWidth
                            >Submit
                            </Button>

                            {isLoading.submit &&
                            
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
        open={isError.submit}
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
