import { Box, Grid, TablePagination } from '@mui/material'
import { CustomFilter, LoadingTable, SearchBox, TableBox } from '@/components'
import { useState } from 'react'

import { dataHead, field } from '@/constants/schedule'
import { useQuery } from 'react-query'
import { fetchData } from '@/api/get'

import { getToken } from '@/helpers/function/getToken'
import { getModalExpired } from '@/helpers/function/getModalExpired'

import ModalInput from './components/ModalInput'
import { useNavigate } from 'react-router-dom'

const Schedule = () => {
  const initialPagination = {
    page: 0,
    row: 5,
  }

  const [openModal, setOpenModal] = useState(false)

  const [filterParam, setFilterParam] = useState({
    filter: '',
    valueFilter: '',
  })

  const [searchSchedule, setSearchSchedule] = useState('')

  const [pagination, setPagination] = useState(initialPagination)

  const dataDepartment = useQuery('departments', () =>
    fetchData('departments', getToken().token)
  )

  const dataSchedule = useQuery(['schedule', filterParam], () =>
    fetchData(
      `doctors/schedule/${filterParam.filter}${filterParam.valueFilter}`,
      getToken().token,
      { name: searchSchedule }
    )
  )

  const navigate = useNavigate()

  if (dataSchedule.isError) {
    getModalExpired().then(() => {
      navigate('/login')
    })
  }

  const handleOpenSchedule = () => {
    setOpenModal((prev) => {
      return !prev
    })
  }

  const onChangeSearch = (e) => {
    setSearchSchedule(e.target.value)
  }

  const handleSearch = () => {
    setFilterParam({ filter: 'doctor', valueFilter: '' })
  }

  const handleResetSearch = () => {
    setSearchSchedule('')
    setFilterParam({ filter: '', valueFilter: '' })
  }

  const handleChangeDepartment = (e) => {
    setSearchSchedule('')
     if (e.target.value === 'all') {
        return setFilterParam({filter : '' , valueFilter: ''})
     }
    setFilterParam((prev) => {
      return { ...prev, filter: 'departments/', valueFilter: e.target.value }
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
  return (
    <>
      <SearchBox
        labelLeftButton='Add new schedule'
        onClickLeftButton={handleOpenSchedule}
        placeholder='Search here...'
        onChangeSearch={onChangeSearch}
        onClickSearch={handleSearch}
        valueSearch={searchSchedule}
        onResetSearch={handleResetSearch}
      >
        <Grid item xs={6}>
          <CustomFilter
            sx={{
              mr: '30px',
              width: '175px',
            }}
            value={filterParam.valueFilter}
            onChange={handleChangeDepartment}
            placeholder='DEPARTMENT'
            filters={dataDepartment.data?.data}
            param={{ title: 'name', value: 'id' }}
          />
        </Grid>
      </SearchBox>
      <Box
        sx={{
          mt: '30px',
        }}
      >
        {dataSchedule.isFetching && <LoadingTable />}
        {!dataSchedule.isFetching && (
          <TableBox
            dataHead={dataHead}
            dataBody={dataSchedule.data?.data.slice(
              pagination.page * pagination.row,
              pagination.page * pagination.row + pagination.row
            )}
            endPoint='doctors/schedule'
            fieldEdit={field}
            editParam=''
            queryKey='schedule'
          >
            <TablePagination
              sx={{
                mt: '30px',
              }}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handlePageChange}
              page={pagination.page}
              rowsPerPage={pagination.row}
              count={
                dataSchedule.data !== undefined
                  ? dataSchedule.data?.data.length
                  : 0
              }
              component='div'
              rowsPerPageOptions={[5, 10]}
            />
          </TableBox>
        )}
      </Box>
      {openModal && (
        <ModalInput open={openModal} onClose={handleOpenSchedule} />
      )}
    </>
  )
}

export default Schedule
