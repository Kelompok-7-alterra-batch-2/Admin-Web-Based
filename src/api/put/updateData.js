import axios from 'axios'

const updateData = async (endPoint, param, dataPost) => {
  let data
  let error = false

  await axios({
    method: 'put',
    url: `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}/${param}`,
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

export default updateData
