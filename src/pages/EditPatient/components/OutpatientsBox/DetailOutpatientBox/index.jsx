import Box from '@mui/material/Box'

import Swal from 'sweetalert2'

import { useState } from 'react'

import NavigationBox from './NavigationBox'
import InfoOupatientBox from './InfoOutpatientBox'
import EditOutpatientBox from './EditOutpatientBox'

import { updateData } from '@/api/put'
import { fieldOutpatient } from '@/constants/patient'
import { useQueryClient } from 'react-query'

const DetailOutpatientBox = (props) => {
  const { data, onClickDetail } = props

  const [isEdit, setIsEdit] = useState(false)

  const [dataOutpatient, setDataOutpatient] = useState(data)

  const [isError, setIsError] = useState({
    appointmentReason: false,
    diagnosis: false,
    prescription: false,
  })

  const queryClient = useQueryClient()

  const handleBack = () => {
    onClickDetail()
  }

  const handleChangeMode = () => {
    setIsEdit((prev) => {
      return !prev
    })
  }

  const handleCancel = () => {
    setDataOutpatient(data)
    handleChangeMode()
  }

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

    setDataOutpatient((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const updateOutpatient = async () => {
    const { error: errorOutpatient } = await updateData(
      'outpatients',
      data.id,
      '',
      {
        patient_id: dataOutpatient.patient.id,
        doctor_id: dataOutpatient.doctor.id,
        department_id: dataOutpatient.department.id,
        outpatientCondition_id: dataOutpatient.outpatientCondition.id,
        date: dataOutpatient.date,
        arrivalTime: dataOutpatient.arrivalTime,
        appointmentReason: dataOutpatient.appointmentReason,
      }
    )

    let errorDiagnosis = false

    if (data.outpatientCondition.id !== 2) {
      errorDiagnosis = await updateData('outpatients/diagnosis', data.id, '', {
        diagnosis: dataOutpatient.diagnosis,
        prescription: dataOutpatient.prescription,
      })
    }

    return errorOutpatient || errorDiagnosis.error
  }

  const handleSubmit = async () => {
    let paramError

    if (data.outpatientCondition.id === 2) {
      if (dataOutpatient.appointmentReason === '') {
        paramError = true
        setIsError((prev) => {
          return { ...prev, appointmentReason: true }
        })
      }
    }

    if (data.outpatientCondition.id !== 2) {
      for (let i = 0; i < fieldOutpatient.length; i++) {
        if (
          dataOutpatient[fieldOutpatient[i]] === '' ||
          dataOutpatient[fieldOutpatient[i]] === null
        ) {
          paramError = true
          setIsError((prev) => {
            return { ...prev, [fieldOutpatient[i]]: true }
          })
        }
        if (
          dataOutpatient[fieldOutpatient[i]] !== '' &&
          dataOutpatient[fieldOutpatient[i]] !== null
        ) {
          setIsError((prev) => {
            return { ...prev, [fieldOutpatient[i]]: false }
          })
        }
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
          let error = await updateOutpatient()
          if (!error) {
            Swal.fire({
              title: 'Outpatient Data has been updated',
              icon: 'success',
              confirmButtonColor: '#4E89A8',
              confirmButtonText: 'Close',
            }).then((result) => {
              if (result.isConfirmed) {
                setIsEdit(false)
                queryClient.invalidateQueries('outpatients-patient')
              }
            })
            setIsEdit(false)
          }
        }
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px',
      }}
    >
      <NavigationBox
        onBack={handleBack}
        isEdit={isEdit}
        onChangeMode={handleChangeMode}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      <InfoOupatientBox date={data.date} doctor={data.doctor.name} />
      <EditOutpatientBox
        isError={isError}
        dataOutpatient={dataOutpatient}
        isEdit={isEdit}
        onChange={handleChange}
      />
    </Box>
  )
}

export default DetailOutpatientBox
