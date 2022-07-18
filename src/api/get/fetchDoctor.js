import { axiosApiInstance } from '@/api'
import { getToken } from '@/helpers/function/getToken'

const fetchDoctor = async (page, row) => {
  const data = await axiosApiInstance.get(`/doctors/page`, {
    headers: {
      Authorization: `Bearer ${getToken().token}`,
    },
    params: {
      page: page,
      size: row,
    },
  })

  return data
}

export default fetchDoctor
