import { Box, Snackbar, Alert, TablePagination, Grid } from '@mui/material'

import { useState } from 'react'

import { useQuery } from 'react-query'

import {
  SearchBox,
  TableBox,
  ModalInput,
  CustomFilter,
  LoadingTable,
} from '@/components'

import { fetchDoctor, fetchFilter, fetchData } from '@/api/get'

import { dataHead, field, initialData } from '@/constants/doctor'

import { getToken } from '@/helpers/function/getToken'

export default function Doctor() {
  const initialPagination = {
    page: 0,
    row: 5,
  }

  const [openModal, setOpenModal] = useState(false)

  const [searchDoctor, setSearchDoctor] = useState('')

  const [filterParam, setFilterParam] = useState({
    enabled: false,
    filter: '',
    paramSearch: '',
    paramFilter: '',
  })

  const [pagination, setPagination] = useState(initialPagination)

  const [manual, setManual] = useState(initialPagination)

  const {
    data,
    isError: isErr,
    isFetching: isLoad,
  } = useQuery(
    ['doctors', pagination],
    () => fetchDoctor(pagination.page, pagination.row),
    { keepPreviousData: true }
  )

  const Department = useQuery(['departments', getToken().token], () =>
    fetchData('departments', getToken().token)
  )

  const filterData = useQuery(
    ['filterData', filterParam],
    () =>
      fetchFilter(
        'doctors',
        filterParam.filter,
        filterParam.paramSearch === ''
          ? filterParam.paramFilter
          : filterParam.paramSearch
      ),
    { enabled: filterParam.enabled }
  )
  const handleChangeDepartment = (e) => {
    if (searchDoctor !== '') {
      setSearchDoctor('')
    }
    if (e.target.value === 'all') {
      return setFilterParam((prev) => {
        return { ...prev, paramFilter: '', enabled: false }
      })
    }
    setFilterParam({
      enabled: true,
      filter: 'departments',
      paramFilter: e.target.value,
      paramSearch: '',
    })

    setManual(initialPagination)
  }

  const handleOpenDoctor = () => {
    setOpenModal((prev) => {
      return !prev
    })
  }

  const onChangeSearch = (e) => {
    if (e.target.value === '') {
      setFilterParam((prev) => {
        return {
          ...prev,
          paramSearch: '',
          enabled: filterParam.paramFilter === '' ? false : true,
        }
      })
    }
    setSearchDoctor(e.target.value)
  }

  const handleSearch = () => {
    setFilterParam({
      enabled: true,
      filter: 'names',
      paramSearch: searchDoctor.toLowerCase(),
      paramFilter: '',
    })
    setManual(initialPagination)
  }

  const handleResetSearch = () => {
    setSearchDoctor('')
    setFilterParam((prev) => {
      return {
        ...prev,
        paramSearch: '',
        enabled: filterParam.paramFilter === '' ? false : true,
      }
    })
  }

  const handlePageChange = (e, newPage) => {
    setPagination((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleChangeRowsPerPage = (e) => {
    setPagination({ page: 0, row: parseInt(e.target.value, 10) })
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
    <Box>
      <SearchBox
        labelLeftButton='Add New Doctor'
        onClickLeftButton={handleOpenDoctor}
        placeholder='Search doctor here...'
        onChangeSearch={onChangeSearch}
        onClickSearch={handleSearch}
        valueSearch={searchDoctor}
        onResetSearch={handleResetSearch}
      >
        <Grid item xs={6}>
          {!Department.isLoading && (
            <CustomFilter
              value={filterParam.paramFilter}
              onChange={handleChangeDepartment}
              placeholder='DEPARTMENT'
              filters={Department.data?.data}
              param={{ title: 'name', value: 'id' }}
              sx={{
                width: '175px',
              }}
            />
          )}
        </Grid>
      </SearchBox>
      {openModal && (
        <ModalInput
          isOpen={openModal}
          handleClose={handleOpenDoctor}
          field={field}
          initialData={initialData}
          title='New Doctor'
          endPoint='doctors'
          methodSubmit='post'
          queryKey={filterParam.enabled ? 'filterData' : 'doctors'}
        />
      )}

      <Box
        sx={{
          marginTop: '30px',
        }}
      >
        {!filterParam.enabled && !filterData.isFetching && (
          <TableBox
            dataHead={dataHead}
            dataBody={data?.data.content}
            isLoading={isLoad}
            endPoint='doctors'
            fieldEdit={field}
            queryKey='doctors'
            editParam=''
          >
            <TablePagination
              sx={{
                mt: '30px',
              }}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handlePageChange}
              page={pagination.page}
              rowsPerPage={pagination.row}
              count={data !== undefined ? data?.data.totalElements : 0}
              component='div'
              rowsPerPageOptions={[5, 10]}
            />
          </TableBox>
        )}

        {filterData.isFetching && <LoadingTable />}

        {filterParam.enabled &&
          filterData.data !== undefined &&
          !filterData.isFetching && (
            <TableBox
              dataHead={dataHead}
              dataBody={filterData.data.data.slice(
                manual.page * manual.row,
                manual.page * manual.row + manual.row
              )}
              endPoint='doctors'
              fieldEdit={field}
              queryKey='filterData'
              editParam=''
            >
              <TablePagination
                sx={{
                  mt: '30px',
                }}
                onRowsPerPageChange={handleManualRow}
                onPageChange={handleManualPage}
                page={manual.page}
                rowsPerPage={manual.row}
                count={filterData.data?.data.length}
                component='div'
                rowsPerPageOptions={[5, 10]}
              />
            </TableBox>
          )}
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={filterData.isError || isErr}
        autoHideDuration={3000}
      >
        <Alert severity='error'>
          Sorry, can't find your search, please try another again
        </Alert>
      </Snackbar>
    </Box>
  )
}
