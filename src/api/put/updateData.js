import { axiosApiInstance } from '@/api'

import { getToken } from '@/helpers/function/getToken'

const updateData = async (endPoint, param, editParam, dataPost) => {
  let data
  let error = false

  await axiosApiInstance({
    method: 'put',
    url: `/${endPoint}/${param}${editParam}`,
    data: {
      ...dataPost,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken().token}`,
    },
  })
    .then((res) => {
      data = res.data
    })
    .catch(() => {
      error = true
    })

  return { data, error }
}

export default updateData
