import { Box, Snackbar, Alert } from '@mui/material'

import React, { useState } from 'react'

import { useQuery } from 'react-query'

import FilterListIcon from '@mui/icons-material/FilterList'

import {
  SearchBox,
  TableBox,
  DefaultLayout,
  ModalInput,
  CustomFilter,
} from 'components'

import { fetchDoctor, fetchSearch, fetchFilter } from 'api/get'

import { dataHead, field, filterItem, initialData } from 'constants/doctor'

export default function Doctor() {
  const [openModal, setOpenModal] = useState(false)

  const [searchDoctor, setSearchDoctor] = useState(null)

  const [isError, setIsError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [filterParam, setFilterParam] = useState('')

  const [dataFilter, setDataFilter] = useState(null)

  const {
    data,
    isError: isErr,
    isLoading: isLoad,
  } = useQuery('doctor', fetchDoctor)

  if (isErr) {
    setIsError(true)
  }

  const handleChangeDepartment = async (e) => {
    setIsLoading(true)
    setFilterParam(e.target.value)

    if (e.target.value === 'all') {
      return setDataFilter(null)
    }

    const { data, error } = await fetchFilter('doctor', e.target.value)

    setDataFilter(data)

    setIsError(error)

    setIsLoading(false)
  }

  const handleOpenDoctor = () => {
    setOpenModal(true)
  }

  const onChangeSearch = (e) => {
    setSearchDoctor(e.target.value)
  }

  const handleSearch = async () => {
    const { data, error } = await fetchSearch('doctor', searchDoctor)

    setDataFilter(data)

    setIsError(error)
  }

  return (
    <DefaultLayout>
      <Box>
        <SearchBox
          labelLeftButton='Add New Doctor'
          onClickLeftButton={handleOpenDoctor}
          placeholder='Search doctor here...'
          onChangeSearch={onChangeSearch}
          onClickSearch={handleSearch}
        />

        <Box
          sx={{
            display: 'flex',
            gap: '30px',
            mt: '30px',
          }}
        >
          <FilterListIcon
            sx={{
              height: '32px',
              width: '32px',
              color: 'primary.main',
            }}
          />

          <CustomFilter
            value={filterParam}
            onChange={handleChangeDepartment}
            placeholder='DEPARTMENT'
            filters={filterItem}
            sx={{
              width: '175px',
            }}
          />
        </Box>

        <ModalInput
          isOpen={openModal}
          handleClose={handleOpenDoctor}
          field={field}
          initialData={initialData}
          title='New Doctor'
          endPoint='doctor'
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
              endPoint='doctor'
              fieldEdit={field}
            />
          )}

          {dataFilter && (
            <TableBox
              dataHead={dataHead}
              dataBody={dataFilter}
              endPoint='doctor'
              fieldEdit={field}
              isLoading={isLoading}
            />
          )}
        </Box>

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
