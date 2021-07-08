import axios from 'axios'

export const getAllUsers = async () => await axios.get('/api/users/', {})

export const getAllRoles = async () => await axios.get('/api/users/roles', {})

export const createUser = async (user) =>
  await axios.post('/api/users/new', user)
