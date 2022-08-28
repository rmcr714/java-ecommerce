import axios from 'axios'

//get products by page size i.e pagination and sorting
export const getProductsByPage = async (pageNum, sortField, sortDir, keyword) =>
  await axios.get(
    `/api/products/page/${pageNum}/sort?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`,
    {}
  )
