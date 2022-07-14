import { useState } from 'react'

import { fetchData } from '@/api/get'

import AvatarBox from './AvatarBox'
import DataDetailBox from './DataDetailBox'
import NotesBox from './NotesBox'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const PersonalDataBox = () => {
  const [isError, setIsError] = useState({})

  const { id } = useParams()

  const dataPatient = useQuery([id, id], () => fetchData(`patients/${id}`))

  const [data, setData] = useState({
    name: '',
    dob: '',
    phoneNumber: '',
    address: '',
    gender_id: 1,
  })

  const handleChange = (e) => {
    if (e.target.value === '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    }
    if (e.target.value === '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }

    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <>
      <AvatarBox />
      <DataDetailBox onChange={handleChange} isError={isError} data={data} />
      <NotesBox />
    </>
  )
}

export default PersonalDataBox
