import { axiosApiInstance } from '@/api'

import { getToken } from '@/helpers/function/getToken'

const postData = async (endPoint, dataPost) => {
  let data
  let error = false

  await axiosApiInstance({
    method: 'post',
    url: `/${endPoint}`,
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

export default postData
