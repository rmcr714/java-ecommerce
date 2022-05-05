import React from 'react'
import { useHistory } from 'react-router-dom'

const AllCategoriesMobile = ({ categories, deleteCategoryById }) => {
  let history = useHistory()
  return (
    <>
      <div className='less-details'>
        <h5>User Details</h5>
        {categories.length > 0 ? (
          categories.map((category) => (
            <>
              <div className='row m-1'>
                <div className='col-4'>
                  <span className='fas fa-portrait fa-2x icon-silver'></span>
                </div>
                <div className='col-8'>
                  <div className='pb-2'>
                    <b>Name: </b>
                    {category.name}
                  </div>
                  <a
                    className='fas fa-edit fa-2x icon-green'
                    style={{ color: 'green' }}
                    onClick={(e) =>
                      history.push(`/admin/categories/edit/${category.id}`)
                    }
                  ></a>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <a
                    className='fas fa-trash fa-2x '
                    style={{ color: 'gray' }}
                    onClick={(e) => deleteCategoryById(category.id)}
                  ></a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {category.enabled ? (
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
                </div>
                <br />
              </div>
              <br />
              <br />
            </>
          ))
        ) : (
          <div className='text-centre text-danger'>
            Sorry something went wrong
          </div>
        )}
      </div>
      <br />
    </>
  )
}

export default AllCategoriesMobile
