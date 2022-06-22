import { Box, Snackbar, Alert, TablePagination } from '@mui/material'

import React, { useState } from 'react'

import { useQuery } from 'react-query'

import { dataHead, initialData, field } from 'constants/patient'

import { fetchPatient, fetchSearch } from 'api/get'

import { SearchBox, TableBox, DefaultLayout, ModalInput } from 'components'

export default function Patient() {
  const initialPagination = {
    row: 5,
    page: 0,
  }

  const [dataFilter, setDataFilter] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [openModal, setOpenModal] = useState(false)

  const [searchPatient, setSearchPatient] = useState(null)

  const [isError, setIsError] = useState(false)

  const [pagination, setPagination] = useState(initialPagination)

  const {
    data,
    isFetching: isLoad,
    isError: isErr,
  } = useQuery(
    ['patients', pagination],
    () => fetchPatient(pagination.page, pagination.row),
    { keepPreviousData: true }
  )

  const handleOpenPatient = () => {
    setOpenModal((prev) => {
      return !prev
    })
  }

  const onChangeSearch = (e) => {
    setSearchPatient(e.target.value)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    const { data, error } = await fetchSearch('patients', searchPatient)
    setDataFilter(data)
    setIsError(error)
    setIsLoading(false)
  }

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleChangeRowsPerPage = (e) => {
    setPagination({ row: parseInt(e.target.value, 10), page: 0 })
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
        />

        <ModalInput
          isOpen={openModal}
          handleClose={handleOpenPatient}
          field={field}
          initialData={initialData}
          title='New Patient'
          endPoint='patients'
          methodSubmit='post'
        />

        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          {!dataFilter && (
            <TableBox
              dataHead={dataHead}
              dataBody={data?.content}
              isLoading={isLoad}
              endPoint='patients'
              fieldEdit={field}
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

        {dataFilter && (
          <TableBox
            dataHead={dataHead}
            dataBody={dataFilter}
            isLoading={isLoading}
            endPoint='patients'
            fieldEdit={field}
          >
            <TablePagination
              sx={{
                mt: '30px',
              }}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handlePageChange}
              page={pagination.page}
              rowsPerPage={pagination.row}
              count={dataFilter.length}
              component='div'
              rowsPerPageOptions={[5, 10]}
            />
          </TableBox>
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isError || isErr}
          onClose={() => setIsError(false)}
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
