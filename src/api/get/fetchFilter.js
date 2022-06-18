import axios from 'axios'

const fetchFilter = async (endPoint, param) => {
  let data
  let error = false
  await axios({
    method: 'get',
    url: `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}?filter=${param}`,
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return (data = res.data)
    })
    .catch(() => {
      return (error = true)
    })

  return { data, error }
}

export default fetchFilter
