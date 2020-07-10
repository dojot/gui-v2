import axios from "axios"
import { getToken } from "./auth"

const { apiUrl } = __CONFIG__

const instance = axios.create({ baseURL: apiUrl })

instance.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
