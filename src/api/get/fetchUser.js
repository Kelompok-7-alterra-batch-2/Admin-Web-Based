import axios from 'axios'
import {host} from '@/api'

const fetchUser = async (param) => {
  const data = await axios.get(
    `${host}/admins/emails/${param}`
  )

  return data
}
export default fetchUser
