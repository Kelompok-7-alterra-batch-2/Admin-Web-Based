import { axiosApiInstance } from '@/api'
import { getToken } from '@/helpers/function/getToken'

const fetchDoctor = async (page, row) => {
  const data = await axiosApiInstance.get(`/doctors/page/${page}/${row}`, {
    headers: {
      Authorization: `Bearer ${getToken().token}`,
    },
  })

  return data
}

export default fetchDoctor
