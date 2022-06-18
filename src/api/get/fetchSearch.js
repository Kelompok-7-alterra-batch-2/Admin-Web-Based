import axios from 'axios'

const fetchSearch = async (endPoint, param) => {
  let data
  let error = false
  await axios
    .get(
      `https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}?search=${param}`
    )
    .then((res) => {
      return (data = res.data)
    })
    .catch(() => {
      return (error = true)
    })

  return { data, error }
}

export default fetchSearch
