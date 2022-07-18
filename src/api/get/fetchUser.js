import axios from 'axios'
import {host} from '@/api'

const fetchUser = async (param,token) => {
  const data = await axios.get(
    `${host}/admins/emails/${param}`,{
       headers : {
          Authorization : `Bearer ${token}`,
       }
    }
  )

  return data
}
export default fetchUser
