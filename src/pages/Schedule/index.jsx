import {
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from '@mui/material'
import { CustomFilter, DefaultLayout, SearchBox, TableBox } from 'components'
import { useState } from 'react'

import { dayList } from 'constants/schedule'
import { toCapitalize } from 'helpers/function/toCapitalize'
import { useQuery } from 'react-query'
import { fetchData } from 'api/get'

const Schedule = () => {
  const [openModal, setOpenModal] = useState(false)

  const [searchSchedule, setSearchSchedule] = useState('')

  const [filterParam, setFilterParam] = useState('')

  const [day, setDay] = useState('')

  const dataDepartment = useQuery('departments', () => fetchData('departments'))

  const handleOpenSchedule = () => {}

  const onChangeSearch = () => {}

  const handleSearch = () => {}

  const handleResetSearch = () => {}

  const handleChangeDepartment = (e) => {
    setFilterParam(e.target.value)
  }

  const handleChangeDate = () => {}

  const onChangeDay = (e) => {
    setDay(e.target.value)
  }

  return (
    <DefaultLayout>
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
          {!dataDepartment.isLoading && (
            <CustomFilter
              sx={{
                mr: '30px',
                width: '175px',
              }}
              value={filterParam}
              onChange={handleChangeDepartment}
              placeholder='DEPARTMENT'
              filters={dataDepartment.data?.data}
              param={{ title: 'name', value: 'id' }}
            />
          )}
          <CustomFilter
            sx={{
              width: '175px',
            }}
            value=''
            onChange={handleChangeDate}
            placeholder='DATE'
            filters={[
              {
                date: '18-10-2022',
                id: 1,
              },
            ]}
            param={{ title: 'date', value: 'id' }}
          />
        </Grid>
      </SearchBox>
      <FormControl
        sx={{
          mt: '20px',
        }}
      >
        <RadioGroup
          aria-labelledby='radio-button-group-label'
          value={day}
          onChange={onChangeDay}
          row
        >
          {dayList.map((option, indexRadio) => (
            <FormControlLabel
              key={indexRadio}
              value={option}
              control={<Radio />}
              label={toCapitalize(option)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </DefaultLayout>
  )
}

export default Schedule
