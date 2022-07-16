import { useEffect, useRef, useState } from 'react'

import Swal from 'sweetalert2'

import { fetchData } from '@/api/get'
import { updateData } from '@/api/put'

import AvatarBox from './AvatarBox'
import DataDetailBox from './DataDetailBox'

import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { fieldEdit } from '@/constants/patient'
import { getToken } from '@/helpers/function/getToken'

const PersonalDataBox = () => {
  const [isError, setIsError] = useState({})

  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams()

  const refPrev = useRef()

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
      const initialValue = {
        name: data.name,
        dob: data.dob,
        phoneNumber: data.phoneNumber,
        address: data.address,
        gender_id: data.gender.id,
      }
      refPrev.current = initialValue
      setData(initialValue)
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
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure the data want to edit is correct?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#4E89A8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { error } = await updateData('patients', id, '', {
            ...data,
            blood_type_id: dataPatient.data?.data.bloodType.id,
            city: dataPatient.data?.data.city,
          })
          if (!error) {
            Swal.fire({
              title: 'Patient Data has been updated',
              icon: 'success',
              confirmButtonColor: '#4E89A8',
              confirmButtonText: 'Close',
            })
            setIsEdit(false)
          }
        }
      })
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
        onCancel={() => {
          setIsEdit(false)
          setData(refPrev.current)
        }}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default PersonalDataBox
