import { Box, Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'

import { useQuery } from 'react-query'

import { DefaultLayout, CustomFilter, SearchBox, TableBox } from 'components'

import FilterListIcon from '@mui/icons-material/FilterList'

import { toCapitalize } from 'helpers/function/toCapitalize'

import { dataHead, field, filterItem } from 'constants/appointment'

import { fetchAppointment } from 'api/get'

import ModalConfirm from './components/ModalConfirm'

const dataDeparment = [
  {
    title: 'general',
    field: [],
  },
  {
    title: 'neurology',
    field: [],
  },
  {
    title: 'cardiology',
    field: [],
  },
  {
    title: 'pediatric',
    field: [],
  },
  {
    title: 'gynecology',
    field: [],
  },
]

export default function Appointment() {
  const [data, setData] = useState(null)

  const [openConfirm, setOpenConfirm] = useState(false)

  const [filterParam, setFilterParam] = useState('')

  const [dataFilter, setDataFilter] = useState(null)

  const { data: dataAppointment, isLoading: isLoad } = useQuery(
    'appointment',
    fetchAppointment
  )

  useEffect(() => {
    if (!isLoad) {
      let totalFilter = []
      for (let i = 0; i < dataDeparment.length; i++) {
        let filter = dataAppointment.filter(
          (item) => item.department === dataDeparment[i].title
        )
        totalFilter.push({ title: dataDeparment[i].title, field: filter })
      }
      setData(totalFilter)
    }
  }, [isLoad, dataAppointment])

  const handleChangeDepartment = (e) => {
    setFilterParam(e.target.value)

    if (e.target.value === 'all') {
      return setDataFilter(null)
    }

    return setDataFilter(data.filter((item) => item.title === e.target.value))
  }

  const handleOpenModal = () => {
    setOpenConfirm(true)
  }

  const onChangeSearch = (e) => {
    console.log(e.target.value)
  }

  const handleSearch = () => {
    console.log('click')
  }

  return (
    <DefaultLayout>
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

        <Box
          sx={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '30px',
          }}
        >
          <Typography variant='h2'>Today Appointment</Typography>

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
                  endPoint='appointment'
                  fieldEdit={field}
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
                  endPoint='appointment'
                  fieldEdit={field}
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
    </DefaultLayout>
  )
}
