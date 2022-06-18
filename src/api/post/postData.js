import axios from 'axios'

const postData = async (endPoint, dataPost) => {
  let data
  let error = false

  await axios({
    method: 'post',
    url: `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}`,
    data: {
      ...dataPost,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      data = res.postData
    })
    .catch(() => {
      error = true
    })

  return { data, error }
}

export default postData
