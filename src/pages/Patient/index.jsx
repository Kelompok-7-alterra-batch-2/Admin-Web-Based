import { Box, Snackbar, Alert } from '@mui/material'

import React, { useState } from 'react'

import { useQuery } from 'react-query'

import { dataHead, initialData, field } from 'constants/patient'

import { fetchPatient, fetchSearch } from 'api/get'

import { SearchBox, TableBox, DefaultLayout, ModalInput } from 'components'

export default function Patient() {
  const [dataFilter, setDataFilter] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [openModal, setOpenModal] = useState(false)

  const [searchPatient, setSearchPatient] = useState(null)

  const [isError, setIsError] = useState(false)

  const {
    data,
    isLoading: isLoad,
    isError: isErr,
  } = useQuery('patient', fetchPatient)

  if (isErr) {
    setIsError(true)
  }

  const handleOpenPatient = () => {
    setOpenModal((prev) => {
      return { ...prev, patient: !prev.patient }
    })
  }

  const onChangeSearch = (e) => {
    setSearchPatient(e.target.value)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    const { data, error } = await fetchSearch('patient', searchPatient)
    setDataFilter(data)
    setIsError(error)
    setIsLoading(false)
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
          endPoint='patient'
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
              dataBody={data}
              isLoading={isLoad}
              endPoint='patient'
              fieldEdit={field}
            />
          )}
        </Box>

        {dataFilter && (
          <TableBox
            dataHead={dataHead}
            dataBody={dataFilter}
            isLoading={isLoading}
            endPoint='patient'
            fieldEdit={field}
          />
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isError}
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
