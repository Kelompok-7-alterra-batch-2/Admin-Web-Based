import { axiosApiInstance } from '@/api'

import { getToken } from '@/helpers/function/getToken'

const fetchAppointment = async () => {
  let { data } = await axiosApiInstance.get(`/outpatients/today`, {
    headers: {
      Authorization: `Bearer ${getToken().token}`,
    },
  })

  return data
}

export default fetchAppointment
