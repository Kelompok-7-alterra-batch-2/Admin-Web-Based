import React from 'react'

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'

import RowTable from './RowTable'

const data = [
    {
        time : '07.00',
        date : '02-05-2022',
        patient : 'Wanda Scarlett',
        department : 'Neurology',
        doctor : 'Dr.Mantis Rachel',
        status : 'pending'
    },
    {
        time : '07.00',
        date : '02-05-2022',
        patient : 'Wanda Scarlett',
        department : 'Neurology',
        doctor : 'Dr.Mantis Rachel',
        status : 'pending'
    },
    {
        time : '07.00',
        date : '02-05-2022',
        patient : 'Wanda Scarlett',
        department : 'Neurology',
        doctor : 'Dr.Mantis Rachel',
        status : 'pending'
    },
    {
        time : '07.00',
        date : '02-05-2022',
        patient : 'Wanda Scarlett',
        department : 'Neurology',
        doctor : 'Dr.Mantis Rachel',
        status : 'process'
    }
]

export default function TableBox() {
  return (
    <Box>
        
        <Typography
        variant='body1'
        sx={{
        marginBottom : '30px'
        }}
        >
        Appointment's Today
        </Typography>

        <TableContainer>

        <Table>
            
            <TableHead>

                <TableRow
                sx={{
                    bgcolor : 'neutral100',
                    borderRadius : '8px',
                }}
                >
                    <TableCell 
                    align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Time</TableCell>
                    <TableCell 
                    align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Date</TableCell>
                    <TableCell 
                    align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Patient</TableCell>
                    <TableCell 
                    align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Department</TableCell>
                    <TableCell 
                    align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Doctor</TableCell>
                    <TableCell align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Status</TableCell>
                    <TableCell align='center'
                    sx={{
                        color : 'primary.main',
                        fontSize : '16px',
                        fontWeight : '700'
                    }}
                    >Edit</TableCell>
                </TableRow>

            </TableHead>


            <TableBody>

                {data.map((item,index)=>(
                    
                    <TableRow 
                    key={index}
                    sx={{
                        borderBottom : '1px solid black'
                    }}
                    >

                        <RowTable item={item}/>

                    </TableRow>
                
                ))}
            
            </TableBody>
        
        </Table>

        </TableContainer>

  </Box>
  )
}
