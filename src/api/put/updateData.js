import host from 'api'
import axios from 'axios'

const updateData = async (endPoint, param, editParam, dataPost) => {
  let data
  let error = false

  await axios({
    method: 'put',
    url: `${host}/${endPoint}/${param}${editParam}`,
    data: {
      ...dataPost,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      data = res.data
    })
    .catch(() => {
      error = true
    })

  return { data, error }
}

export default updateData
