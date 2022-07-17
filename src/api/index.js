import axios from 'axios'

const host = import.meta.env.VITE_REST_API_END_POINT

const axiosApiInstance = axios.create(
   {
      baseURL : host,
  }
)

// Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//        console.log('err')
//       // originalRequest._retry = true
//       // const access_token = await refreshAccessToken()
//       // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
//       // return axiosApiInstance(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )

export { host, axiosApiInstance }
