import { axiosApiInstance } from '@/api'

const fetchData = async (endPoint, token, params) => {
  const config = {
    method: 'get',
    url: `/${endPoint}`,
    params: params === undefined ? {} : params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const data = await axiosApiInstance(config)
  return data
}
export default fetchData
