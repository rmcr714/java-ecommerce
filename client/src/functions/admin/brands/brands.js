import axios from 'axios'

//get users by page size i.e pagination and sorting
export const getBrandsByPage = async (pageNum, sortField, sortDir, keyword) =>
  await axios.get(
    `/api/brands/page/${pageNum}/sort?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`,
    {}
  )

export const createbrand = async (brand) =>
  await axios.post('/api/brands/new', brand)

export const deleteBrand = async (id) =>
  await axios.delete(`/api/brands/delete/${id}`, {})

export const getBrandById = async (id) =>
  await axios.get(`/api/brands/get_brand/${id}`, {})

export const updatebrand = async (brand, id) =>
  await axios.post(`/api/brands/edit/${id}`, brand)

//export excel
export const exportBrandsToExcel = async () =>
  await axios
    .get('/api/brands/export/excel', {
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
        `Brands_${new Date().toLocaleString() + ''}.xlsx`
      )
      document.body.appendChild(link)
      link.click()
    })
