import axios from 'axios'

const fetchDoctor = async () => {
  const { data } = await axios.get(
    `https://62a18758cc8c0118ef4d691f.mockapi.io/doctor`
  )

  return data
}

export default fetchDoctor
