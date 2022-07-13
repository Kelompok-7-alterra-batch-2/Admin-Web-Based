import {host} from '@/api'
import axios from 'axios'

const fetchAppointment = async () => {
  let { data } = await axios.get(`${host}/outpatients/today`)

  return data
}

export default fetchAppointment
