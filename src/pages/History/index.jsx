import { useState } from 'react'
import { useQuery } from 'react-query'

import { Grid } from '@mui/material'

import { fetchData } from '@/api/get'

import { TableBox, SearchBox, CustomFilter } from '@/components'

import { dataHead } from '@/constants/history'

import { getModalExpired } from '@/helpers/function/getModalExpired'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const [endPoint, setEndPoint] = useState('outpatients')

  const [search, setSearch] = useState('')

  const [filterParam, setFilterParam] = useState('')

  const dataHistory = useQuery(['history', endPoint], () => fetchData(endPoint))

  const dataDepartment = useQuery('departments', () => fetchData('departments'))

  const navigate = useNavigate()

  if (dataHistory.isError) {
    getModalExpired().then(() => {
      navigate('/login')
    })
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {}

  const handleResetSearch = () => {}

  const handleChangeDepartment = () => {}

  return (
    <>
      <SearchBox
        placeholder='Search here...'
        onChangeSearch={onChangeSearch}
        onClickSearch={handleSearch}
        valueSearch={search}
        onResetSearch={handleResetSearch}
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

      <TableBox
        dataHead={dataHead}
        dataBody={dataHistory.data?.data}
        isLoading={dataHistory.isFetching}
      ></TableBox>
    </>
  )
}

export default History
