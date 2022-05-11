import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import AllBrandsMobile from './AllBrandsMobile'
import {
  getBrandsByPage,
  deleteBrand,
  exportBrandsToExcel,
} from '../../../functions/admin/brands/brands'

const AllBrands = ({ history }) => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)

  /*************************    pagination and sorting ***************************************************/
  const [brandsCount, setBrandsCount] = useState(0)
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
    temp = [...brands]
    temp.sort(dynamicSort(value, order))
    setBrands(temp)
  }

  /******************************************* get all users data *********************************************/
  const getBrandData = (page, sortField, sortDir, search) => {
    getBrandsByPage(page, sortField, sortDir, search)
      .then((response) => {
        setBrandsCount(response.data.totalItems)
        setBrands(response.data.AllBrands)
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
    getBrandData(page, sortField, sortDir, keyword)
    setLoading(false)
  }, [page])

  /****************************************** delete Brand **************************************************/
  const deleteBrandById = (id) => {
    if (window.confirm('Confirm to delete brand with  id ' + id)) {
      console.log(id)
      deleteBrand(id)
        .then((res) => {
          if (res.data == 'OK') {
            toast.success('brand successfully deleted')
            setLoading(true)
            getBrandData(page, sortField, sortDir, keyword)
            setLoading(false)
          }
        })
        .catch((err) => {
          toast.error(`brand with id ${id} does not exist`)
        })
    }
  }

  /************************************************** export to excel *********************************/
  const exportToExcel = () => {
    exportBrandsToExcel().catch((err) => toast.error('Something went wrong!'))
  }

  /*************************************** Page*******************************************************************/

  return (
    <div className='container-fluid'>
      <br />
      <h2>Manage Brands</h2>
      {/* ***********************ADD NEW BRANDS AND EXPORT TO EXCEL ************************************* */}
      <div>
        <Link
          onClick={() => history.push('/admin/brands/create')}
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
            onClick={() => getBrandData(page, sortField, sortDir, keyword)}
            disabled={keyword.length == 0}
          >
            <i className='fas fa-search  '></i>
          </button>
          &nbsp;
          <button
            type='button'
            class='btn btn-secondary'
            onClick={() => {
              getBrandData(page, sortField, sortDir, '')
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
                    Brand Id
                    <span onClick={() => sortData('id', 1)} className='ml-4'>
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span onClick={() => sortData('id', -1)} className='ml-2'>
                      <a className='fas fa-sort-down'></a>
                    </span>
                  </th>
                  <th>Image</th>
                  <th>
                    Brand Name
                    <span onClick={() => sortData('name', 1)} className='ml-4'>
                      <a className='fas fa-sort-up'></a>
                    </span>
                    <span onClick={() => sortData('name', -1)} className='ml-2'>
                      <a className='fas fa-sort-down'></a>
                    </span>
                  </th>
                  <th>
                    Categories
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

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr>
                      <td>{brand.id}</td>
                      <td>
                        <span className='fas fa-portrait fa-2x icon-silver'></span>
                      </td>
                      {/* <td>{brand.image}</td> */}
                      <td>{brand.name}</td>

                      <td>
                        {brand.categories.map((category) => (
                          <span className='badge badge-secondary m-1 '>
                            {category.name}&nbsp;
                          </span>
                        ))}
                      </td>

                      <td>
                        <a
                          className='fas fa-edit fa-2x icon-green'
                          style={{ color: 'green' }}
                          onClick={(e) =>
                            history.push(`/admin/brands/edit/${brand.id}`)
                          }
                        ></a>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <a
                          className='fas fa-trash fa-2x '
                          style={{ color: 'gray' }}
                          onClick={(e) => deleteBrandById(brand.id)}
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
          <AllBrandsMobile
            brands={brands}
            deleteBrandById={deleteBrandById}
            history={history}
          />
          <br />
          {/* Pagination Section */}
          <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center  p-2'>
              <h6>
                Showing {startCount} to {endCount} of {brandsCount} users
              </h6>
              <Pagination
                defaultCurrent={1}
                total={(brandsCount / 8) * 10}
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

export default AllBrands
