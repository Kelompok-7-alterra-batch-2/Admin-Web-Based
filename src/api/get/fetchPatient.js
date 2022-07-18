import {axiosApiInstance} from '@/api'
import {getToken} from '@/helpers/function/getToken'

const fetchPatient = async (page, row) => {
  let { data } = await axiosApiInstance.get(`/patients/page`,{
     headers : {
        Authorization : `Bearer ${getToken().token}`
     },
     params : {
        page : page,
        size : row,
     }
  })

  return data
}

export default fetchPatient
