import axios from 'axios'

/******************                   Create and manage Categories by Admin                  ************************************/

//get users by page size i.e pagination and sorting
export const getCategoriesByPage = async (
  pageNum,
  sortField,
  sortDir,
  keyword
) =>
  await axios.get(
    `/api/categories/page/${pageNum}/sort?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`,
    {}
  )

export const getHierarchicalCategories = async () =>
  await axios.get('/api/categories/listCategories', {})

export const createCategory = async (category) =>
  await axios.post('/api/categories/new', category)

export const getCategoryById = async (id) =>
  await axios.get(`/api/categories/get_category/${id}`, {})

export const updateCategory = async (category, id) =>
  await axios.post(`/api/categories/edit/${id}`, category)

export const deleteCategory = async (id) =>
  await axios.delete(`/api/categories/delete/${id}`, {})

//export excel
export const exportCategoriesToExcel = async () =>
  await axios
    .get('/api/categories/export/excel', {
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
        `Categories_${new Date().toLocaleString() + ''}.xlsx`
      )
      document.body.appendChild(link)
      link.click()
    })
