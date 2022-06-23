import host from 'api'
import axios from 'axios'

const fetchFilter = async (endPoint, filter, param) => {
  let data = await axios({
    method: 'get',
    url: `${host}/${endPoint}/${filter}/${param}`,
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}

export default fetchFilter
