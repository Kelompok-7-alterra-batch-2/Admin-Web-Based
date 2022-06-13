import React,{useState} from 'react'

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow, 
    IconButton, 
    Skeleton,
    Box,
    Typography} from '@mui/material'

import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'

import { ModalInput } from 'components'

import ModalDelete from './ModalDelete'
import CustomChip from './CustomChip'

import { toCapitalize } from 'helpers/function/toCapitalize'

export default function TableBox(props) {

    const { dataHead, dataBody , isLoading , endPoint , fieldEdit } = props

    const [openModal,setOpenModal] = useState({
        edit : false,
        delete : false
    })

    const [param,setParam] = useState({
        delete : null,
        edit : null
    })

    const handleOpenEdit = (item) => {

        setOpenModal((prev)=>{
            return {...prev,edit : !prev.edit}
        })

        setParam((prev)=>{return {...prev,edit : item}})

    }

    const handleOpenDelete = (id) =>{
        
        setParam((prev)=>{
            return {...prev, delete : id}
        })

        setOpenModal((prev)=>{
            return {...prev,delete : !prev.delete}
        })


    }

  return (

    <>

        <TableContainer>

            <Table>
                
                <TableHead>

                    <TableRow
                    sx={{
                        bgcolor : 'neutral100',
                        borderRadius : '8px',
                    }}
                    >

                        {dataHead.map((item,index)=>(

                            <TableCell
                            key={index} 
                            align='center'
                            sx={{
                                color : 'primary.main',
                                fontSize : '16px',
                                fontWeight : '700'
                            }}
                            >
                            {item.headerName}
                            </TableCell>

                        ))}
                        
                    </TableRow>

                </TableHead>

                {dataBody && <TableBody>

                    {dataBody.map((itemRow,indexRow)=>(

                        <TableRow
                        key={indexRow}
                        sx={{
                                borderBottom : '1px solid black'
                            }}
                        >
                        
                            {
                                dataHead.map((itemCell,indexCell)=>{

                                    if (itemCell.fieldname === 'queue') {

                                        return (
                                            <TableCell
                                            key={indexCell}
                                            align='center'
                                            >
                                            {indexRow + 1}
                                            </TableCell>
                                        )

                                    }

                                    if (itemCell.fieldname ==='status'){

                                        return (
                                            <TableCell 
                                            key={indexCell}
                                            align='center'>

                                                <CustomChip
                                                params={itemRow[itemCell.fieldname]}
                                                />

                                            </TableCell> 
                                        )

                                    }

                                    if (itemCell.fieldname === 'edit') {
                                        
                                        return (

                                            <TableCell 
                                            align='center'
                                            key={indexCell}
                                            >

                                                <IconButton
                                                onClick={()=>{handleOpenEdit(itemRow)}}
                                                >
                                                    <Edit/>
                                                </IconButton>

                                                <IconButton
                                                onClick={()=>handleOpenDelete(itemRow.id)}
                                                >
                                                    <Delete/>
                                                </IconButton>

                                            </TableCell>

                                        )

                                    }
                                    
                                    return (

                                    <TableCell 
                                    key={indexCell}
                                    align='center'
                                    >
                                        {itemRow[itemCell.fieldname]}
                                    </TableCell>)
                                    
                                })
                            }

                        </TableRow>
                    
                    ))}
                
                </TableBody> }
            
            </Table>

            {isLoading && 
                
                <Box
                sx={{
                    width : "100%"
                }}
                >

                    <Skeleton
                    animation="wave"
                    height={100}
                    width="100%"/>
                
                </Box>

            }

            {(!isLoading && (!dataBody || dataBody.length === 0))  && 

                <Box
                sx={{
                    width : '100%',
                    textAlign : 'center',
                    my : '30px'
                }}
                >

                    <Typography
                    variant='body1'
                    color='neutral500'
                    > No data in this table </Typography>

                </Box>

            }


        </TableContainer>

        {openModal.delete &&
        <ModalDelete
        isOpen={openModal.delete}
        handleClose={handleOpenDelete}
        deleteParams={param.delete}
        endPoint={endPoint}
        />
        }

        {openModal.edit &&
        <ModalInput
        isOpen={openModal.edit}
        handleClose={handleOpenEdit}
        field={fieldEdit}
        initialData={param.edit}
        title={('Edit ' + toCapitalize(endPoint))}
        endPoint={endPoint}
        methodSubmit='put'
        />
        }

        </>

  )
}
