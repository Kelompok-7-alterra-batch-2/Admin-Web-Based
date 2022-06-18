import axios from 'axios'

const fetchData = async (endPoint) => {
  let data
  let error
  await axios
    .get(`https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}`)
    .then((res) => {
      return (data = res.data)
    })
    .catch(() => {
      return (error = true)
    })

  return { data, error }
}
export default fetchData
