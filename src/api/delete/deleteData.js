import { axiosApiInstance } from '@/api'

import { getToken } from '@/helpers/function/getToken'

const deleteData = async (endPoint, param) => {
  let data
  let error = false
  await axiosApiInstance
    .delete(`/${endPoint}/${param}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    })
    .then(() => {
      data = true
    })
    .catch(() => {
      error = true
    })
  return { data, error }
}
export default deleteData
