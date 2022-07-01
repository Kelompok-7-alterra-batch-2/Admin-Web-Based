import host from 'api'
import axios from 'axios'

const fetchData = async (endPoint, params) => {
  const config = {
    method: 'get',
    url: `${host}/${endPoint}`,
    headers: { 'Content-Type': 'application/json' },
    params: params === undefined ? {} : params,
  }
  const data = await axios(config)

  return data
}
export default fetchData
