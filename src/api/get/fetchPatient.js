import host from '@/api'
import axios from 'axios'

const fetchPatient = async (page, row) => {
  let { data } = await axios.get(`${host}/patients/page/${page}/${row}`)

  return data
}

export default fetchPatient
