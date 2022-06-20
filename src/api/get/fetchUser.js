import axios from 'axios'

const fetchUser = async (param) => {
  const data = await axios.get(
    `https://62a18758cc8c0118ef4d691f.mockapi.io/user/${param}`
  )

  return data
}
export default fetchUser
