import host from 'api'
import axios from 'axios'

const fetchDoctor = async (page, row) => {
  const { data } = await axios.get(`${host}/doctors/page/${page}/${row}`)

  return data
}

export default fetchDoctor
