import {host} from '@/api'
import axios from 'axios'

const deleteData = async (endPoint, param) => {
  let data
  let error = false
  await axios
    .delete(`${host}/${endPoint}/${param}`)
    .then(() => {
      data = true
    })
    .catch(() => {
      error = true
    })
  return { data, error }
}
export default deleteData
