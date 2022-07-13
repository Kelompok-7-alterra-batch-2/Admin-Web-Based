import axios from 'axios'

import {host} from '@/api'

const postLogin = async (dataPost) => {
  let data
  let error = false

  await axios({
    method: 'post',
    url: `${host}/users/login`,
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

export default postLogin
