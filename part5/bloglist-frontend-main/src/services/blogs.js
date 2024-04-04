import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(`${baseUrl}/like/${id}`, {}, config)
    return response.data
  } catch (error) {
    console.error('Error adding like:', error)
    throw error // Propagate the error to the caller
  }
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error removing blog:', error)
    throw error // Propagate the error to the caller
  }
}

const logOut = () => {
  token = null
}

export default { getAll, setToken, create, logOut, addLike, removeBlog }