import axios from 'axios'

const deleteData = async (endPoint, param) => {
  let data
  let error = false
  await axios
    .delete(`https://62a18758cc8c0118ef4d691f.mockapi.io/${endPoint}/${param}`)
    .then(() => {
      data = true
    })
    .catch(() => {
      error = true
    })
  return { data, error }
}
export default deleteData
