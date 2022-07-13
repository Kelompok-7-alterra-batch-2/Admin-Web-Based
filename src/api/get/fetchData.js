import axios from 'axios'
import { host, axiosApiInstance } from '@/api'

const cek = JSON.parse(localStorage.getItem('token'))

const fetchData = async (endPoint, params) => {
  const config = {
    method: 'get',
    url: `/${endPoint}`,
    params: params === undefined ? {} : params,
    // headers: {
    //   Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFmd2FuQGdtYWlsLmNvbSIsImlhdCI6MTY1NzY5MjE4NywiZXhwIjoxNjU3Njk1Nzg3fQ.Qa3vtSVM0ipC1924nj-XYsKbJW_sCHLYi14cl4p4PAs`,
    // },
  }
  const data = await axiosApiInstance(config)
  // const data = await fetch(`${host}/${endPoint}`, {
  //   method: 'GET', // POST, PUT, DELETE, etc.
  //   headers: {
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFmd2FuQGdtYWlsLmNvbSIsImlhdCI6MTY1NzY5MjE4NywiZXhwIjoxNjU3Njk1Nzg3fQ.Qa3vtSVM0ipC1924nj-XYsKbJW_sCHLYi14cl4p4PAs`,
  //   },
  //   body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
  //   referrer: 'about:client', // or "" to send no Referer header,
  //   // or an url from the current origin
  //   referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, origin, same-origin...
  //   mode: 'cors', // same-origin, no-cors
  //   credentials: 'same-origin', // omit, include
  //   cache: 'default', // no-store, reload, no-cache, force-cache, or only-if-cached
  //   redirect: 'follow', // manual, error
  //   integrity: '', // a hash, like "sha256-abcdef1234567890"
  //   keepalive: false, // true
  //   signal: undefined, // AbortController to abort request
  //   window: window, // null
  // })

  return data
}
export default fetchData
