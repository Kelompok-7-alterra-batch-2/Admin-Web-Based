import axios from 'axios'

const fetchPatient = async () => {
  let { data } = await axios.get(
    'https://62a18758cc8c0118ef4d691f.mockapi.io/patient'
  )

  return data
}

export default fetchPatient
