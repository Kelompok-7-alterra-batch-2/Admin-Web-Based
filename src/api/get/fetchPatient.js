import {axiosApiInstance} from '@/api'
import {getToken} from '@/helpers/function/getToken'

const fetchPatient = async (page, row) => {
  let { data } = await axiosApiInstance.get(`/patients/page/${page}/${row}`,{
     headers : {
        Authorization : `Bearer ${getToken().token}`
     }
  })

  return data
}

export default fetchPatient
