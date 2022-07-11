import { CustomInput } from '@/components'

import moment from 'moment'

const CustomDateInput = (props) => {
  const { value, name, label, onChange, isError } = props

  const format = 'YYYY[-]MM[-]DD'

  const handleChange = (e) => {
    const max = moment().add(1, 'M')
    const min = moment('1920-01-01')
    const maxCheck = moment.min(moment(e.target.value), max)
    const minCheck = moment.max(maxCheck, min).format(format)
    if (minCheck === 'Invalid date') {
      return onChange('')
    }
    onChange(minCheck)
  }

  return (
    <CustomInput
      value={value}
      name={name}
      label={label}
      onChange={handleChange}
      type='date'
      isError={isError}
      errorMessage={`Field ${name} is empty`}
    />
  )
}

export default CustomDateInput
