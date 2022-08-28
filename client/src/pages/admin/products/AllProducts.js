import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { getProductsByPage } from '../../../functions/admin/products/products'

const AllProducts = ({ history }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  /*************************    pagination and sorting ***************************************************/
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)
  const [startCount, setStartCount] = useState(0)
  const [endCount, setEndCount] = useState(0)
  const [sortField, setSortField] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [keyword, setKeyword] = useState('')

  /********************************  sort the categories data ******************************************/
  function dynamicSort(property, order) {
    var sortOrder = order
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  const sortData = (value, order) => {
    console.log('gifd')
    let temp = []
    temp = [...products]
    temp.sort(dynamicSort(value, order))
    setProducts(temp)
  }

  /******************************************* get all users data *********************************************/
  const getProductData = (page, sortField, sortDir, search) => {
    getProductsByPage(page, sortField, sortDir, search)
      .then((response) => {
        setProductsCount(response.data.totalItems)
        setProducts(response.data.AllProducts)
        setStartCount(response.data.startCount)
        setEndCount(response.data.endCount)
        // console.log(response.data.AllUsers)
      })
      .catch((err) => {
        toast.error(`user  does not exist`)
      })
  }

  /************************************ useEffect *************************************************************/
  useEffect(() => {
    setLoading(true)
    // console.log('runing')
    getProductData(page, sortField, sortDir, keyword)
    setLoading(false)
  }, [page])

  /****************************************** delete Brand **************************************************/
  const deleteProductById = (id) => {}

  /************************************************** export to excel *********************************/
  const exportToExcel = () => {}

  return (
    <div className='container-fluid'>
      <br />
      <h2>Manage Products</h2>
      {/* ***********************ADD NEW BRANDS AND EXPORT TO EXCEL ************************************* */}
      <div>
        <Link
          onClick={() => history.push('/admin/products/create')}
          style={{ textDecoration: 'none' }}
        >
          {/* <button style={{ color: 'white', background: 'black' }} className='h6'>
          Create New User
        </button> */}
          <a className='fas fa-user-plus fa-2x icon-dark'></a>
        </Link>
        &nbsp; &nbsp;| &nbsp;&nbsp;
        <a
          className='fas fa-file-excel fa-2x icon-dark'
          onClick={() => exportToExcel()}
        />
      </div>
      <br />
      {/* ****************** Search Bar****************************************** */}
      <div>
        <form className='form-inline'>
          <h6>Filter</h6>&nbsp;&nbsp;
          <input
            type='search'
            class='form-control'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          &nbsp; &nbsp;
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => getProductData(page, sortField, sortDir, keyword)}
            disabled={keyword.length == 0}
          >
            <i className='fas fa-search  '></i>
          </button>
          &nbsp;
          <button
            type='button'
            class='btn btn-secondary'
            onClick={() => {
              getProductData(page, sortField, sortDir, '')
              setKeyword('')
            }}
            disabled={keyword.length == 0}
          >
            <i className='fas fa-eraser  '></i>
          </button>
        </form>
      </div>
      <br />
      {/* ***************************************************************** */}

      {loading ? (
        <div className='container text-center'>
          <div className='spinner-border  m-10' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className='full-details'>
            <table className='table table-bordered table-striped table-hover table-responsive-xl'>
              <thead className='thead-dark'>
                <tr>
                  <th>
                    Product Id
                    <span onClick={() => sortData('id', 1)} className='ml-4'>
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span onClick={() => sortData('id', -1)} className='ml-2'>
                      <a className='fas fa-sort-down'></a>
                    </span>
                  </th>
                  <th>Image</th>
                  <th>
                    Product Name
                    <span onClick={() => sortData('name', 1)} className='ml-4'>
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span onClick={() => sortData('name', -1)} className='ml-2'>
                      <a className='fas fa-sort-down'></a>
                    </span>
                  </th>
                  <th>
                    Brand
                    {/* <span
                      onClick={() => sortData('firstName', 1)}
                      className='ml-4'
                    >
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span
                      onClick={() => sortData('firstName', -1)}
                      className='ml-2'
                    >
                      <a className='fas fa-sort-down'></a>
                    </span> */}
                  </th>
                  <th>
                    Category
                    {/* <span
                      onClick={() => sortData(products[0].category.name, 1)}
                      className='ml-4'
                    >
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span
                      onClick={() => sortData(products[0].category.name, -1)}
                      className='ml-2'
                    >
                      <a className='fas fa-sort-down'></a>
                    </span> */}
                  </th>
                  <th>
                    Enabled
                    <span
                      onClick={() => sortData('enabled', 1)}
                      className='ml-4 a'
                    >
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span
                      onClick={() => sortData('enabled', -1)}
                      className='ml-2 a'
                    >
                      <a className='fas fa-sort-down'></a>
                    </span>
                  </th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr>
                      <td>{product.id}</td>
                      <td>
                        <span className='fas fa-portrait fa-2x icon-silver'></span>
                      </td>
                      {/* <td>{product.image}</td> */}
                      <td>{product.name}</td>

                      <td>{product.brand.name}</td>
                      <td>{product.category.name}</td>
                      <td>
                        {product.enabled ? (
                          <a
                            className='fas fa-check-circle fa-2x'
                            style={{ color: '#6495ED' }}
                          ></a>
                        ) : (
                          <i
                            className='fas fa-window-close fa-2x'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>

                      <td>
                        <a
                          className='fas fa-edit fa-2x icon-green'
                          style={{ color: 'green' }}
                          onClick={(e) =>
                            history.push(`/admin/products/edit/${product.id}`)
                          }
                        ></a>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <a
                          className='fas fa-trash fa-2x '
                          style={{ color: 'gray' }}
                          onClick={(e) => deleteProductById(product.id)}
                        ></a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className='text-centre text-danger'>
                    Sorry something went wrong
                  </div>
                )}
              </tbody>
            </table>
          </div>
          {/* For mobile view */}
          {/* <AllProductsMobile
            products={products}
            deleteProductById={deleteProductById}
            history={history}
          /> */}
          <br />
          {/* Pagination Section */}
          <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center  p-2'>
              <h6>
                Showing {startCount} to {endCount} of {productsCount} products
              </h6>
              <Pagination
                defaultCurrent={1}
                total={(productsCount / 8) * 10}
                onChange={(value) => setPage(value)}
              />
              <br />
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllProducts
