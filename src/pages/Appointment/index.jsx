import { Box, Typography, Grid } from '@mui/material'

import { useState, useEffect } from 'react'

import { useQuery } from 'react-query'

import { CustomFilter, SearchBox, TableBox, LoadingTable } from '@/components'

import { toCapitalize } from '@/helpers/function/toCapitalize'

import { dataHead, field } from '@/constants/appointment'

import { fetchAppointment, fetchData } from '@/api/get'

import ModalConfirm from './components/ModalConfirm'

export default function Appointment() {
  const [data, setData] = useState(null)

  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterParam, setFilterParam] = useState('')

  const [dataFilter, setDataFilter] = useState(null)

  const dataDepartment = useQuery('departments', () => fetchData('departments'))

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
    console.log()
  }

  const handleSearch = () => {
    console.log('click')
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
                dataBody={item.field}
                isLoading={isLoad}
                endPoint='outpatients'
                fieldEdit={field}
                queryKey='outpatients'
                editParam=''
              />
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
