import { useState } from 'react'
import { useQuery } from 'react-query'

import { fetchData } from '@/api/get'

import { TableBox } from '@/components'

import { dataHead, field } from '@/constants/history'

import { getModalExpired } from '@/helpers/function/getModalExpired'
import { getToken } from '@/helpers/function/getToken'
import { useNavigate } from 'react-router-dom'
import { TablePagination, Typography } from '@mui/material'

const History = () => {
  const [paginate, setPaginate] = useState({
    page: 0,
    row: 5,
  })
   
  const Department = useQuery(['departments', getToken().token], () =>
    fetchData('departments', getToken().token)
  )


  const dataHistory = useQuery(['history', paginate], () =>
    fetchData(`outpatients/page`, getToken().token, {
      page: paginate.page,
      size: paginate.row,
    })
  )

  const navigate = useNavigate()

  if (dataHistory.isError) {
    getModalExpired().then(() => {
      navigate('/login')
    })
  }

  const handlePageChange = (e, newPage) => {
    setPaginate((prev) => {
      return { ...prev, page: newPage }
    })
  }

  const handleChangeRowsPerPage = (e) => {
    setPaginate({ page: 0, row: parseInt(e.target.value, 10) })
  }

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          mb: '30px',
        }}
      >
        History Outpatients
      </Typography>
      <TableBox
        dataHead={dataHead}
        dataBody={dataHistory.data?.data.content}
        isLoading={dataHistory.isFetching}
        endPoint='outpatients'
        fieldEdit={field}
        queryKey='history'
        editParam=''
      >
        <TablePagination
          sx={{
            mt: '30px',
          }}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handlePageChange}
          page={paginate.page}
          rowsPerPage={paginate.row}
          count={
            dataHistory.data !== undefined
              ? dataHistory.data?.data.totalElements
              : 0
          }
          component='div'
          rowsPerPageOptions={[5, 10]}
        />
      </TableBox>
    </>
  )
}

export default History
