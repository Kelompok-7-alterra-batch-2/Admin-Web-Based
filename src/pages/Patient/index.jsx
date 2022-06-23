import { Box, Snackbar, Alert, TablePagination } from '@mui/material'

import React, { useState } from 'react'

import { useQuery } from 'react-query'

import { dataHead, initialData, field } from 'constants/patient'

import { fetchPatient, fetchSearch } from 'api/get'

import {
  SearchBox,
  TableBox,
  DefaultLayout,
  ModalInput,
  LoadingTable,
} from 'components'

export default function Patient() {
  const initialPagination = {
    row: 5,
    page: 0,
  }

  const initialSearch = {
    value: '',
    enabled: false,
  }

  const [openModal, setOpenModal] = useState(false)

  const [searchPatient, setSearchPatient] = useState(initialSearch)

  const [pagination, setPagination] = useState(initialPagination)

  const [manual, setManual] = useState(initialPagination)

  const {
    data,
    isFetching: isLoad,
    isError: isErr,
  } = useQuery(
    ['patients', pagination],
    () => fetchPatient(pagination.page, pagination.row),
    { keepPreviousData: true }
  )

  const dataSearch = useQuery(
    ['searchPatient', searchPatient],
    () => fetchSearch('patients', searchPatient.value),
    { enabled: searchPatient.enabled }
  )

  const handleOpenPatient = () => {
    setSearchPatient(initialSearch)
    setOpenModal((prev) => {
      return !prev
    })
  }

  const onChangeSearch = (e) => {
    setSearchPatient({ value: e.target.value, enabled: false })
  }

  const handleSearch = () => {
    setSearchPatient((prev) => {
      return { ...prev, enabled: true }
    })
    setManual(initialPagination)
  }

  const handleResetSearch = () => {
    setSearchPatient({ value: '', enabled: false })
  }

  const handlePageChange = (e, newPage) => {
    setPagination((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleChangeRowsPerPage = (e) => {
    setPagination({ row: parseInt(e.target.value, 10), page: 0 })
  }

  const handleManualPage = (e, newPage) => {
    setManual((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleManualRow = (e) => {
    setManual({ page: 0, row: parseInt(e.target.value, 10) })
  }

  return (
    <DefaultLayout>
      <Box>
        <SearchBox
          labelLeftButton='Add New Patient'
          onClickLeftButton={handleOpenPatient}
          placeholder='Search patient here...'
          onChangeSearch={onChangeSearch}
          onClickSearch={handleSearch}
          valueSearch={searchPatient.value}
          onResetSearch={handleResetSearch}
        />

        <ModalInput
          isOpen={openModal}
          handleClose={handleOpenPatient}
          field={field}
          initialData={initialData}
          title='New Patient'
          endPoint='patients'
          methodSubmit='post'
          queryKey='patients'
        />

        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          {!searchPatient.enabled && !dataSearch.isFetching && (
            <TableBox
              dataHead={dataHead}
              dataBody={data?.content}
              isLoading={isLoad}
              endPoint='patients'
            >
              <TablePagination
                sx={{
                  mt: '30px',
                }}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handlePageChange}
                page={pagination.page}
                rowsPerPage={pagination.row}
                count={data !== undefined ? data.totalElements : 0}
                component='div'
                rowsPerPageOptions={[5, 10]}
              />
            </TableBox>
          )}
        </Box>

        {dataSearch.isFetching && <LoadingTable />}

        {searchPatient.enabled &&
          dataSearch.data !== undefined &&
          !dataSearch.isFetching && (
            <TableBox
              dataHead={dataHead}
              dataBody={dataSearch.data.data.slice(
                manual.page * manual.row,
                manual.page * manual.row + manual.row
              )}
              endPoint='patients'
            >
              <TablePagination
                sx={{
                  mt: '30px',
                }}
                onRowsPerPageChange={handleManualRow}
                onPageChange={handleManualPage}
                page={manual.page}
                rowsPerPage={manual.row}
                count={dataSearch.data?.data.length}
                component='div'
                rowsPerPageOptions={[5, 10]}
              />
            </TableBox>
          )}

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={dataSearch.isError || isErr}
          autoHideDuration={3000}
        >
          <Alert severity='error'>
            Sorry, can't find your search, please try another again
          </Alert>
        </Snackbar>
      </Box>
    </DefaultLayout>
  )
}
