import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
} from '@mui/material'

import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'

import { LoadingTable, ModalInput, DataNotFound } from '@/components'

import ModalDelete from './ModalDelete'
import CustomChip from './CustomChip'

import { toCapitalize } from '@/helpers/function/toCapitalize'
import { useNavigate } from 'react-router-dom'

export default function TableBox(props) {
  const {
    dataHead,
    dataBody,
    isLoading,
    endPoint,
    fieldEdit,
    queryKey,
    children,
    editParam,
  } = props

  const [openModal, setOpenModal] = useState({
    edit: false,
    delete: false,
  })

  const [param, setParam] = useState({
    delete: null,
    edit: null,
  })

  const navigate = useNavigate()

  const handleOpenEdit = (item) => {
    setOpenModal((prev) => {
      return { ...prev, edit: !prev.edit }
    })

    setParam((prev) => {
      return { ...prev, edit: item }
    })
  }

  const handleOpenDelete = (id) => {
    setParam((prev) => {
      return { ...prev, delete: id }
    })

    setOpenModal((prev) => {
      return { ...prev, delete: !prev.delete }
    })
  }

  return (
    <>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: 'neutral100',
                  borderRadius: '8px',
                }}
              >
                {dataHead.map((item, index) => (
                  <TableCell
                    key={index}
                    align='center'
                    sx={{
                      color: 'primary.main',
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    {item.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {dataBody && !isLoading && (
              <TableBody>
                {dataBody.map((itemRow, indexRow) => (
                  <TableRow
                    key={indexRow}
                    sx={{
                      borderBottom: '1px solid black',
                    }}
                  >
                    {dataHead.map((itemCell, indexCell) => {
                      if (itemCell.fieldname === 'queue') {
                        return (
                          <TableCell key={indexCell} align='center'>
                            {indexRow + 1}
                          </TableCell>
                        )
                      }

                      if (itemCell.fieldname === 'outpatientCondition') {
                        return (
                          <TableCell key={indexCell} align='center'>
                            <CustomChip
                              params={itemRow.outpatientCondition.conditions}
                            />
                          </TableCell>
                        )
                      }

                      if (itemCell.fieldname === 'edit') {
                        return (
                          <TableCell align='center' key={indexCell}>
                            {!itemCell.redirect && (
                              <IconButton
                                onClick={() => {
                                  handleOpenEdit(itemRow)
                                }}
                              >
                                <Edit />
                              </IconButton>
                            )}
                            {itemCell.redirect && (
                              <IconButton
                                onClick={() => {
                                  navigate(`${itemCell.path}${itemRow.id}`)
                                }}
                              >
                                <Edit />
                              </IconButton>
                            )}

                            {itemCell.delete && (
                              <IconButton
                                onClick={() => handleOpenDelete(itemRow.id)}
                              >
                                <Delete />
                              </IconButton>
                            )}
                          </TableCell>
                        )
                      }

                      if (itemCell.noCap) {
                        if (itemCell.fieldChild) {
                          return (
                            <TableCell key={indexCell} align='center'>
                              {itemRow[itemCell.fieldname][itemCell.fieldChild]}
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={indexCell} align='center'>
                            {itemRow[itemCell.fieldname]}
                          </TableCell>
                        )
                      }

                      if (itemCell.fieldGrandChild) {
                        return (
                          <TableCell key={indexCell} align='center'>
                            {toCapitalize(
                              itemRow[itemCell.fieldname][itemCell.fieldChild][
                                itemCell.fieldGrandChild
                              ]
                            )}
                          </TableCell>
                        )
                      }

                      if (itemCell.fieldChild) {
                        return (
                          <TableCell key={indexCell} align='center'>
                            {toCapitalize(
                              itemRow[itemCell.fieldname][itemCell.fieldChild]
                            )}
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell key={indexCell} align='center'>
                          {itemRow
                            ? toCapitalize(itemRow[itemCell.fieldname])
                            : ''}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {isLoading && <LoadingTable />}

          {!isLoading && (!dataBody || dataBody.length === 0) && (
            <DataNotFound />
          )}
        </TableContainer>
        {children}
      </Box>

      <ModalDelete
        isOpen={openModal.delete}
        handleClose={handleOpenDelete}
        deleteParams={param.delete}
        endPoint={endPoint}
        queryKey={queryKey}
      />

      {openModal.edit && (
        <ModalInput
          isOpen={openModal.edit}
          handleClose={handleOpenEdit}
          field={fieldEdit}
          initialData={param.edit}
          title={'Edit ' + toCapitalize(endPoint)}
          endPoint={endPoint}
          methodSubmit='put'
          queryKey={queryKey}
          editParam={editParam}
        />
      )}
    </>
  )
}
