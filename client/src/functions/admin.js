import axios from 'axios'

export const getAllUsers = async () => await axios.get('/api/users/', {})

//get users by page size i.e pagination and sorting
export const getUsersByPage = async (pageNum, sortField, sortDir, keyword) =>
  await axios.get(
    `/api/users/page/${pageNum}/sort?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`,
    {}
  )

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

//export excel
export const exportUsersToExcel = async () =>
  await axios
    .get('/api/users/export/excel', {
      headers: {
        'Content-Disposition': 'attachment',
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `Users_${new Date().toLocaleString() + ''}.xlsx`
      )
      document.body.appendChild(link)
      link.click()
    })
