import axios from 'axios'

import { host } from '@/api'

const postRegister = async (dataPost) => {
  let data
  let error = false

   console.log(host)
  await axios({
    method: 'post',
    url: `${host}/admins`,
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

export default postRegister
