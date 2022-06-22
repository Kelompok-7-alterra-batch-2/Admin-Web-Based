import host from 'api'
import axios from 'axios'

const fetchSearch = async (endPoint, param) => {
  let data
  let error = false
  await axios
    .get(`${host}/${endPoint}/names/${param}`)
    .then((res) => {
      return (data = res.data)
    })
    .catch(() => {
      return (error = true)
    })

  return { data, error }
}

export default fetchSearch
