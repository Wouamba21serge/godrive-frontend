import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Attach JWT token to every request automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser    = (data) => API.post('/auth/login', data)

export default API