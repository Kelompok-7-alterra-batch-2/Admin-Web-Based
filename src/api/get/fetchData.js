import host from 'api'
import axios from 'axios'

const fetchData = async (endPoint) => {
  let data = await axios.get(`${host}/${endPoint}`)

  return data
}
export default fetchData
