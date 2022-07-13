import axios from 'axios'

const host = import.meta.env.VITE_REST_API_END_POINT
    const value = localStorage.getItem('token')
    const keys = JSON.parse(value)

const axiosApiInstance = axios.create(
   {
      baseURL : host,
      headers : {
         Authorization : value === null ? '' : `Bearer ${keys.token}`
      }
   }
)

// Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async (config) => {
//     const value = localStorage.getItem('token')
//     const keys = JSON.parse(value)
//     config.headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${keys.token}`,
//     }
//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

// Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const access_token = await refreshAccessToken()
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
//       return axiosApiInstance(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )

export { host, axiosApiInstance }
