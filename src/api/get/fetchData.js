import host from 'api'
import axios from 'axios'

const fetchData = async (endPoint, body) => {
  let data = await axios.get(`${host}/${endPoint}`, { data: body })

  return data
}
export default fetchData
