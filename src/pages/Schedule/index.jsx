import {
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  TablePagination,
} from '@mui/material'
import { CustomFilter, LoadingTable, SearchBox, TableBox } from '@/components'
import { useState } from 'react'

import { dayList, dataHead, field } from '@/constants/schedule'
import { toCapitalize } from '@/helpers/function/toCapitalize'
import { useQuery } from 'react-query'
import { fetchData } from '@/api/get'

import { getToken } from '@/helpers/function/getToken'

import ModalInput from './components/ModalInput'

const Schedule = () => {
  const initialPagination = {
    page: 0,
    row: 5,
  }

  const [openModal, setOpenModal] = useState(false)

  const [searchSchedule, setSearchSchedule] = useState('')

  const [filterParam, setFilterParam] = useState('')

  const [day, setDay] = useState('')

  const [pagination, setPagination] = useState(initialPagination)

  // const dataDepartment = useQuery('departments', () => fetchData('departments'))

  const dataSchedule = useQuery(['schedule', getToken().token], () =>
    fetchData('doctors/schedule', getToken().token)
  )

  const handleOpenSchedule = () => {
    setOpenModal((prev) => {
      return !prev
    })
  }

  const onChangeSearch = () => {}

  const handleSearch = () => {}

  const handleResetSearch = () => {}

  // const handleChangeDepartment = (e) => {
  //   setFilterParam(e.target.value)
  // }
  //
  // const handleChangeDate = () => {}
  //
  // const onChangeDay = (e) => {
  //   setDay(e.target.value)
  // }

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
          {/* <CustomFilter */}
          {/*   sx={{ */}
          {/*     mr: '30px', */}
          {/*     width: '175px', */}
          {/*   }} */}
          {/*   value={filterParam} */}
          {/*   onChange={handleChangeDepartment} */}
          {/*   placeholder='DEPARTMENT' */}
          {/*   filters={dataDepartment.data?.data} */}
          {/*   param={{ title: 'name', value: 'id' }} */}
          {/* /> */}
        </Grid>
      </SearchBox>
      {/* <FormControl */}
      {/*   sx={{ */}
      {/*     mt: '20px', */}
      {/*   }} */}
      {/* > */}
      {/*   <RadioGroup */}
      {/*     aria-labelledby='radio-button-group-label' */}
      {/*     value={day} */}
      {/*     onChange={onChangeDay} */}
      {/*     row */}
      {/*   > */}
      {/*     {dayList.map((option, indexRadio) => ( */}
      {/*       <FormControlLabel */}
      {/*         key={indexRadio} */}
      {/*         value={option} */}
      {/*         control={<Radio />} */}
      {/*         label={toCapitalize(option)} */}
      {/*       /> */}
      {/*     ))} */}
      {/*   </RadioGroup> */}
      {/* </FormControl> */}
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
      <ModalInput open={openModal} onClose={handleOpenSchedule} />
    </>
  )
}

export default Schedule
