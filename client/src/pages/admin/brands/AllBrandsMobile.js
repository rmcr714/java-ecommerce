import React from 'react'
import { useHistory } from 'react-router-dom'

const AllBrandsMobile = ({ brands, deleteBrandById }) => {
  let history = useHistory()

  return (
    <>
      <div className='less-details'>
        <h5>Brands Details</h5>
        {brands.length > 0 ? (
          brands.map((brand) => (
            <>
              <div className='row m-1'>
                <div className='col-4'>
                  <span className='fas fa-portrait fa-2x icon-silver'></span>
                </div>
                <div className='col-8'>
                  <div className='pb-2'>
                    <b>Name: </b>
                    {brand.name}
                  </div>
                  <a
                    className='fas fa-edit fa-2x icon-green'
                    style={{ color: 'green' }}
                    onClick={(e) =>
                      history.push(`/admin/brands/edit/${brand.id}`)
                    }
                  ></a>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <a
                    className='fas fa-trash fa-2x '
                    style={{ color: 'gray' }}
                    onClick={(e) => deleteBrandById(brand.id)}
                  ></a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

export default AllBrandsMobile
