import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL,
})

export default apiClient