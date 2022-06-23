import host from 'api'
import axios from 'axios'

const fetchSearch = async (endPoint, param) => {
  let data = await axios.get(`${host}/${endPoint}/names/${param}`)

  return data
}

export default fetchSearch
