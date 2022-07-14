import { FormControl, Select, MenuItem, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { fetchData } from '@/api/get'
import { getToken } from '@/helpers/function/getToken'

const DepartmentInput = (props) => {
  const { onChange, value } = props

  const department = useQuery(['departments', getToken().token], () =>
    fetchData('departments', getToken().token)
  )

  return (
    <FormControl fullWidth>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 'normal',
        }}
      >
        Department
      </Typography>
      <Select
        onChange={onChange}
        value={value}
        size='small'
        sx={{
          fontSize: '16px',
          fontWeight: 'normal',
        }}
      >
        <MenuItem value=''>None</MenuItem>
        {!department.isLoading &&
          department.data?.data.map((item, index) =>( 
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DepartmentInput
