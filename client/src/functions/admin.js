import axios from 'axios'

export const getAllUsers = async () => await axios.get('/api/users/', {})

//get users by page size i.e pagination
export const getUsersByPage = async (pageNum) =>
  await axios.get(`/api/users/page/${pageNum}`, {})

export const getAllRoles = async () => await axios.get('/api/users/roles', {})

export const createUser = async (user) =>
  await axios.post('/api/users/new', user)

export const checkDuplicateEmail = async (email) =>
  await axios.get(`/api/users/check_email/${email}`, {})

export const checkEmailWhileUpdate = async (email, id) =>
  await axios.get(`/api/users/update_email/${email}/${id}`)

export const getUserById = async (id) =>
  await axios.get(`/api/users/get_user/${id}`, {})

export const updateUser = async (user, id) =>
  await axios.post(`/api/users/edit/${id}`, user)

export const deleteUser = async (id) =>
  await axios.delete(`/api/users/delete/${id}`, {})
