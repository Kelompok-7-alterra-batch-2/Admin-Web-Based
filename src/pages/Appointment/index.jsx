import { Box, Typography, Grid, TablePagination } from '@mui/material'

import { useState, useEffect } from 'react'

import { useQuery } from 'react-query'

import { CustomFilter, SearchBox, TableBox, LoadingTable } from '@/components'

import { toCapitalize } from '@/helpers/function/toCapitalize'

import {
  dataHead,
  field,
  dataHeadFilter,
  filterStatus,
} from '@/constants/appointment'

import { fetchData } from '@/api/get'

import { getToken } from '@/helpers/function/getToken'

import ModalConfirm from './components/ModalConfirm'
import { useNavigate } from 'react-router-dom'
import { getModalExpired } from '@/helpers/function/getModalExpired'

export default function Appointment() {
  const [data, setData] = useState(null)

  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterParam, setFilterParam] = useState({
    department: '',
    status: '',
  })

  const [dataFilter, setDataFilter] = useState(null)

  const [searchAppointment, setSearchAppointment] = useState('')

  const [dataSearch, setDataSearch] = useState(null)

  const [pagination, setPagination] = useState({
    page: 0,
    row: 5,
  })

  const dataDepartment = useQuery(['departments', getToken().token], () =>
    fetchData('departments', getToken().token)
  )

  const {
    data: dataAppointment,
    isFetching: isLoad,
    isError,
  } = useQuery(['outpatients-today', filterParam.status], () =>
    fetchData(`outpatients${filterParam.status}/today`, getToken().token)
  )

  const navigate = useNavigate()

  if (isError) {
    getModalExpired().then(() => {
      navigate('/login')
    })
  }

  useEffect(() => {
    if (!isLoad && !dataDepartment.isLoading) {
      let totalFilter = []
      for (let i = 0; i < dataDepartment.data?.data.length; i++) {
        let filter = dataAppointment?.data.filter(
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
  }, [
    isLoad,
    dataAppointment?.data,
    dataDepartment.isLoading,
    dataDepartment.data,
  ])

  useEffect(() => {
    if (filterParam.department !== '') {
      setDataFilter(data.filter((item) => item.id === filterParam.department))
    }
  }, [filterParam.department, data])

  const handleChangeDepartment = (e) => {
    setDataSearch(null)
    if (e.target.value === 'all') {
      setDataFilter(null)
      return setFilterParam((prev) => {
        return { ...prev, department: '' }
      })
    }
    setFilterParam((prev) => {
      return { ...prev, department: e.target.value }
    })
  }

  const handleChangeStatus = (e) => {
    setDataSearch(null)
    if (e.target.value === 'all') {
      return setFilterParam((prev) => {
        return { ...prev, status: '' }
      })
    }
    setFilterParam((prev) => {
      return { ...prev, status: e.target.value }
    })
  }

  const handleOpenModal = () => {
    setOpenConfirm(true)
  }

  const onChangeSearch = (e) => {
    setSearchAppointment(e.target.value)
  }

  const handleResetSearch = () => {
    setSearchAppointment('')
    setDataSearch(null)
  }

  const handleSearch = () => {
    fetchData('outpatients/patients/today', getToken().token, {
      name: searchAppointment,
    }).then((result) => {
      setPagination({
        page: 0,
        row: 5,
      })
      setDataSearch(result.data)
    })
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
        valueSearch={searchAppointment}
        onResetSearch={handleResetSearch}
        onClickSearch={handleSearch}
      >
        <Grid item xs={6}>
          {!dataDepartment.isLoading && (
            <CustomFilter
              value={filterParam.department}
              onChange={handleChangeDepartment}
              placeholder='DEPARTMENT'
              filters={dataDepartment.data?.data}
              param={{ title: 'name', value: 'id' }}
              sx={{
                width: '175px',
                mr: '30px',
              }}
            />
          )}
          <CustomFilter
            value={filterParam.status}
            onChange={handleChangeStatus}
            placeholder='STATUS'
            filters={filterStatus}
            param={{ title: 'name', value: 'value' }}
            sx={{
              width: '175px',
            }}
          />
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
          !dataSearch &&
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
                dataHead={
                  filterParam.status !== '' && filterParam.status !== 'all'
                    ? dataHeadFilter
                    : dataHead
                }
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
          !dataSearch &&
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
        {dataSearch && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '30px',
            }}
          >
            <TableBox
              dataHead={dataHeadFilter}
              dataBody={dataSearch.slice(
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
                count={dataSearch.length}
                component='div'
                rowsPerPageOptions={[5, 10]}
              />
            </TableBox>
          </Box>
        )}
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
