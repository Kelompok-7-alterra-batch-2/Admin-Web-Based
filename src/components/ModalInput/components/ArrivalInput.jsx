import { CustomInput } from '@/components'
import { useEffect } from 'react'
import { useState } from 'react'

const ArrivalInput = (props) => {
  const { value, onChange, item, isError, onSubmit, clearList } = props

  const [arrivalTerm, setArrivalTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setArrivalTerm(value)
    }, 2000)
    return () => clearTimeout(timer)
  }, [value])

  useEffect(() => {
    if (arrivalTerm !== '') {
      onSubmit(arrivalTerm)
    } else {
      clearList()
    }
  }, [arrivalTerm])

  return (
    <CustomInput
      name={item.fieldname}
      value={value}
      label={item.title}
      onChange={onChange}
      type='time'
      isError={isError}
      errorMessage={`Field ${item.title} is empty`}
    />
  )
}

export default ArrivalInput
