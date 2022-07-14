import { useEffect, useState } from 'react'

import { fetchData } from '@/api/get'
import { updateData } from '@/api/put'

import AvatarBox from './AvatarBox'
import DataDetailBox from './DataDetailBox'
import NotesBox from './NotesBox'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { fieldEdit } from '@/constants/patient'
import { getToken } from '@/helpers/function/getToken'

const PersonalDataBox = () => {
  const [isError, setIsError] = useState({})

  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams()

  const dataPatient = useQuery([id, id], () =>
    fetchData(`patients/${id}`, getToken().token)
  )

  const [data, setData] = useState({
    name: '',
    dob: '',
    phoneNumber: '',
    address: '',
    gender_id: 1,
  })

  useEffect(() => {
    if (!dataPatient.isLoading) {
      const data = dataPatient.data?.data
      setData({
        name: data.name,
        dob: data.dob,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender_id: data.gender.id,
      })
    }
  }, [dataPatient.data?.data, dataPatient.isLoading])

  const handleChange = (e) => {
    if (e.target.value === '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    }
    if (e.target.value !== '') {
      setIsError((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }

    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async () => {
    let paramError
    for (let i = 0; i < fieldEdit.length; i++) {
      if (data[fieldEdit[i]] === '') {
        paramError = true
        setIsError((prev) => {
          return { ...prev, [fieldEdit[i]]: true }
        })
      }
      if (data[fieldEdit[i]] !== '') {
        setIsError((prev) => {
          return { ...prev, [fieldEdit[i]]: false }
        })
      }
    }

    if (!paramError) {
      await updateData('patients', id, '', {
        ...data,
        blood_type_id: dataPatient.data?.data.bloodType.id,
        city: dataPatient.data?.data.city,
      })
      setIsEdit(false)
    }
  }

  return (
    <>
      <AvatarBox
        data={dataPatient.data?.data}
        name={data.name}
        onChange={handleChange}
        isError={isError.name}
        isEdit={isEdit}
      />
      <DataDetailBox
        onChange={handleChange}
        isError={isError}
        data={data}
        isEdit={isEdit}
        onChangeMode={() => {
          setIsEdit((prev) => {
            return !prev
          })
        }}
        onSubmit={handleSubmit}
      />
      <NotesBox />
    </>
  )
}

export default PersonalDataBox
