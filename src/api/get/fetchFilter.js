import { axiosApiInstance } from '@/api'
import { getToken } from '@/helpers/function/getToken'

const fetchFilter = async (endPoint, filter, param) => {
  let data = await axiosApiInstance({
    method: 'get',
    url: `${endPoint}/${filter}/${param}`,
    data: {},
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken().token}`,
    },
  })

  return data
}

export default fetchFilter
