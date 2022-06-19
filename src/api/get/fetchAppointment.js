import axios from 'axios'

const fetchAppointment = async () => {
  let { data } = await axios.get(
    'https://62a18758cc8c0118ef4d691f.mockapi.io/appointment'
  )

  return data
}

export default fetchAppointment
