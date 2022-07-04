import axios from 'axios'

import host from '@/api'

const postData = async (endPoint, dataPost) => {
  let data
  let error = false

  await axios({
    method: 'post',
    url: `${host}/${endPoint}`,
    data: {
      ...dataPost,
    },
    headers: {
      'Content-Type': 'application/json',
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
