import React,{useState} from 'react'

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow, 
    Chip,
    IconButton, 
    Skeleton,
    Box} from '@mui/material'

import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete' 

import ModalDelete from './ModalDelete'

export default function TableBox(props) {

    const { dataHead, dataBody , isLoading} = props

    const [openModal,setOpenModal] = useState({
        edit : false,
        delete : false
    })

    // const handleOpenEdit = () => {

    //     setOpenModal((prev)=>{
    //         return {...prev,edit : !prev.edit}
    //     })

    // }

    const handleOpenDelete = () =>{

        setOpenModal((prev)=>{
            return {...prev,delete : !prev.delete}
        })

    }

  return (

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

                                    if (itemCell.fieldname ==='status'){

                                        return (
                                            <TableCell 
                                            key={indexCell}
                                            align='center'>
                                                <Chip 
                                                label={itemRow[itemCell.fieldname]}
                                                variant='outlined'
                                                color={itemRow[itemCell.fieldname] === 'pending' ? 'warning' : 'primary'}
                                                sx={{
                                                    borderRadius : '4px',
                                                    bgcolor : itemRow[itemCell.fieldname] === 'pending' ? 'bgWarning' : 'bgPrimary'
                                                }}
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
                                                // onClick={handleOpenEdit}
                                                >
                                                    <Edit/>
                                                </IconButton>

                                                <IconButton
                                                onClick={handleOpenDelete}
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

                            <ModalDelete
                            isOpen={openModal.delete}
                            handleClose={handleOpenDelete}
                            deleteParams={dataBody[indexRow].id}
                            />

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
                    
                    <Skeleton
                    animation="wave"
                    height={100}
                    width="100%"
                    />

                    <Skeleton
                    animation="wave"
                    height={100}
                    width="100%"
                    />
                
                </Box>

            }

        </TableContainer>

  )
}
