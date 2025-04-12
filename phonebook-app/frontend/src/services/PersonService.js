import axios from 'axios'

const baseUrl = '/api/persons'
console.log('frontin baseURL', baseUrl)

const getAll = () => (
  axios.get(baseUrl).then(response => response.data)
)

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const remove = (id) => (
  axios.delete(`${baseUrl}/${id}`)
)

const replace = (id, newObject) => (
  axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
)

export default { getAll, create, remove, replace }