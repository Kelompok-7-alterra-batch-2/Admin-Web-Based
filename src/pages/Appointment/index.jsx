import { Box, Typography, Grid, TablePagination } from '@mui/material'

import { useState, useEffect } from 'react'

import { useQuery } from 'react-query'

import { CustomFilter, SearchBox, TableBox, LoadingTable } from '@/components'

import { toCapitalize } from '@/helpers/function/toCapitalize'

import { dataHead, field } from '@/constants/appointment'

import { fetchAppointment, fetchData } from '@/api/get'

import { getToken } from '@/helpers/function/getToken'

import ModalConfirm from './components/ModalConfirm'

export default function Appointment() {
  const [data, setData] = useState(null)

  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterParam, setFilterParam] = useState('')

  const [dataFilter, setDataFilter] = useState(null)

  const [pagination, setPagination] = useState({
    page: 0,
    row: 5,
  })

  const dataDepartment = useQuery(['departments', getToken().token], () =>
    fetchData('departments', getToken().token)
  )

  const { data: dataAppointment, isFetching: isLoad } = useQuery(
    'outpatients',
    fetchAppointment
  )

  useEffect(() => {
    if (!isLoad && !dataDepartment.isLoading) {
      let totalFilter = []
      for (let i = 0; i < dataDepartment.data?.data.length; i++) {
        let filter = dataAppointment.filter(
          (item) => item.department.id === dataDepartment.data?.data[i].id
        )
        totalFilter.push({
          title: dataDepartment.data?.data[i].name,
          id: dataDepartment.data?.data[i].id,
          field: filter,
        })
      }
      setData(totalFilter)
    }
  }, [isLoad, dataAppointment, dataDepartment.isLoading, dataDepartment.data])

  const handleChangeDepartment = (e) => {
    setFilterParam(e.target.value)

    if (e.target.value === 'all') {
      return setDataFilter(null)
    }

    return setDataFilter(data.filter((item) => item.id === e.target.value))
  }

  const handleOpenModal = () => {
    setOpenConfirm(true)
  }

  const onChangeSearch = (e) => {
    console.log(e)
  }

  const handleSearch = () => {
    console.log(data)
  }

  const handlePageChange = (e, newPage) => {
    setPagination((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleRowsChange = (e) => {
    setPagination({ page: 0, row: parseInt(e.target.value, 10) })
  }

  return (
    <Box
      sx={{
        mb: '30px',
      }}
    >
      <SearchBox
        labelLeftButton='Add new appointment'
        onClickLeftButton={handleOpenModal}
        placeholder='Search here...'
        onChangeSearch={onChangeSearch}
        onClickSearch={handleSearch}
      >
        <Grid item xs={6}>
          {!dataDepartment.isLoading && (
            <CustomFilter
              value={filterParam}
              onChange={handleChangeDepartment}
              placeholder='DEPARTMENT'
              filters={dataDepartment.data?.data}
              param={{ title: 'name', value: 'id' }}
              sx={{
                width: '175px',
              }}
            />
          )}
        </Grid>
      </SearchBox>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '30px',
        }}
      >
        <Typography variant='h2'>Today Appointment</Typography>

        {!data && <LoadingTable />}
        {data &&
          !dataFilter &&
          data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '30px',
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  textAlign: 'center',
                }}
              >
                {toCapitalize(item.title)} Department
              </Typography>

              <TableBox
                dataHead={dataHead}
                dataBody={item.field}
                isLoading={isLoad}
                endPoint='outpatients'
                fieldEdit={field}
                queryKey='outpatients'
                editParam=''
              />
            </Box>
          ))}

        {dataFilter &&
          dataFilter.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '30px',
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  textAlign: 'center',
                }}
              >
                {toCapitalize(item.title)} Department
              </Typography>

              <TableBox
                dataHead={dataHead}
                dataBody={item.field.slice(
                  pagination.page * pagination.row,
                  pagination.page * pagination.row + pagination.row
                )}
                isLoading={isLoad}
                endPoint='outpatients'
                fieldEdit={field}
                queryKey='outpatients'
                editParam=''
              >
                <TablePagination
                  sx={{
                    mt: '30px',
                  }}
                  onRowsPerPageChange={handleRowsChange}
                  onPageChange={handlePageChange}
                  page={pagination.page}
                  rowsPerPage={pagination.row}
                  count={item.field.length}
                  component='div'
                  rowsPerPageOptions={[5, 10]}
                />
              </TableBox>
            </Box>
          ))}
      </Box>

      <ModalConfirm
        isOpen={openConfirm}
        handleClose={() => {
          setOpenConfirm(false)
        }}
        fieldInput={field}
      />
    </Box>
  )
}
