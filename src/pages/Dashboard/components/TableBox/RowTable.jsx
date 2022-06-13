import React, { useState } from 'react'

import { TableCell , Chip, IconButton } from '@mui/material'

import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'

import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'

export default function RowTable(props) {

    const {item} = props

    const [openModal,setOpenModal] = useState({
        edit : false,
        delete : false
    })

    const handleOpenEdit = () => {

        setOpenModal((prev)=>{
            return {...prev,edit : !prev.edit}
        })

    }

    const handleOpenDelete = () =>{

        setOpenModal((prev)=>{
            return {...prev,delete : !prev.delete}
        })

    }

  return (
    <>

        <TableCell align='center'>{item.time}</TableCell>
        <TableCell align='center'>{item.date}</TableCell>
        <TableCell align='center'>{item.patient}</TableCell>
        <TableCell align='center'>{item.department}</TableCell>
        <TableCell align='center'>{item.doctor}</TableCell>
        <TableCell align='center'>
            <Chip 
            label={item.status}
            variant='outlined'
            color={item.status === 'pending' ? 'warning' : 'primary'}
            sx={{
                borderRadius : '4px',
                bgcolor : item.status === 'pending' ? 'bgWarning' : 'bgPrimary'
            }}
            />    
        </TableCell>
        <TableCell align='center'>

            <IconButton
            onClick={handleOpenEdit}
            >
                <Edit/>
            </IconButton>

            <IconButton
            onClick={handleOpenDelete}
            >
                <Delete/>
            </IconButton>

        </TableCell>

        <ModalEdit
        isOpen={openModal.edit}
        handleClose={handleOpenEdit}
        />
        
        <ModalDelete 
        isOpen={openModal.delete}
        handleClose={handleOpenDelete}
        />

    </>
 
   )
}
