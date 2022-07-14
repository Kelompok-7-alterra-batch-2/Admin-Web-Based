import {axiosApiInstance} from '@/api'

import {getToken} from '@/helpers/function/getToken'

const fetchSearch = async (endPoint, param) => {
  let data = await axiosApiInstance.get(`/${endPoint}/names/${param}`,{
     headers : {
        Authorization : `Bearer ${getToken().token}`
     }
  })

  return data
}

export default fetchSearch
