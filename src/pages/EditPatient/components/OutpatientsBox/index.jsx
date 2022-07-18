import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

import TabPanel from './TabPanel'
import PastOutpatientBox from './PastOutpatientBox'
import UpcomingOutpatientBox from './UpcomingOutpatientsBox'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { fetchData } from '@/api/get'
import { getToken } from '@/helpers/function/getToken'

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const OutpatientsBox = () => {
  const [tab, setTab] = useState(0)

  const [past, setPast] = useState([])

  const [upcoming, setUpcoming] = useState([])

  const { id } = useParams()

  const dataOutpatients = useQuery(['outpatients-patient', id], () =>
    fetchData(`outpatients/patients/${id}`, getToken().token)
  )

  useEffect(() => {
    if (!dataOutpatients.isFetching) {
      const data = dataOutpatients.data?.data
      let upcomingData = []
      let pastData = []
      data.filter((item) => {
        const dateNow = moment().format('YYYY[-]MM[-]DD')
        if (moment(item.date).isAfter(dateNow)) {
          return upcomingData.push(item)
        }
        return pastData.push(item)
      })
      setPast(pastData)
      setUpcoming(upcomingData)
    }
  }, [dataOutpatients.isFetching])

  const handleChange = (e, newTab) => {
    setTab(newTab)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          columnGap: '25px',
          alignItems: 'center',
        }}
      >
        <Tabs value={tab} onChange={handleChange}>
          <Tab label='Past Appointment' {...allyProps(0)} />
          <Tab label='Upcoming Appointment' {...allyProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <PastOutpatientBox data={past} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <UpcomingOutpatientBox data={upcoming} />
      </TabPanel>
    </>
  )
}

export default OutpatientsBox
