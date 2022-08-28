import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  getAllBrands,
  getBrandById,
} from '../../../functions/admin/brands/brands'

const ProductOverview = ({
  history,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription,
}) => {
  /***********************************  Form States  ***************************************/
  const [name, setName] = useState('')
  const [alias, setAlias] = useState('')
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState('')
  const [categories, setCategories] = useState([])
  const [caregory, setCategory] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [inStock, setInStock] = useState(false)
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [quantity, setQuantity] = useState(0)

  /************************************ SELECT A BRAND ************************************* */
  const selectBrand = (value) => {
    setBrand(value)
    getBrandById(value)
      .then((response) => setCategories(response.data.categories))
      .catch((e) => toast.error('Something wrong happened'))
  }

  /************************************ SELECT A CATEGORY ************************************* */
  const selectCategory = (value) => {
    setCategory(value)
  }

  /****************************************** USEEFFECT ********************************************* */
  useEffect(() => {
    //getting all the categories through api call
    getAllBrands().then((response) => {
      setBrands(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <>
      <div className='  rounded p-3'>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b> Product Name:</b> <sup className='h6'>*</sup>
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              required
              minLength='3'
              maxLength='256'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b> Alias:</b>
            <sup className='h6'>*</sup>
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              required
              minLength='3'
              maxLength='256'
              value={alias}
              placeholder='default product name , space is replaced by dashes'
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b> Brand:</b>
            <sup className='h6'>*</sup>
          </label>
          <div className='col-sm-10'>
            <select
              className='form-control'
              required
              onChange={(event) => selectBrand(event.target.value)}
            >
              <option value=''>Nothing selected</option>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))
              ) : (
                <div>
                  <option value=''>No Data found</option>_
                </div>
              )}
            </select>
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b> Category:</b>
            <sup className='h6'>*</sup>
          </label>
          <div className='col-sm-10'>
            <select
              className='form-control'
              onChange={(event) => selectCategory(event.target.value)}
              required
            >
              <option value=''>Nothing selected</option>_
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))
              ) : (
                <div>
                  <option value='0'>No Data found</option>_
                </div>
              )}
            </select>
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>Enabled:</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='checkbox'
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>In Stock:</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='checkbox'
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>Cost:</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>Price</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>Discount</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>
            <b>Quantity</b>
          </label>
          <div className='col-sm-10'>
            <input
              type='number'
              className='form-control'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className='text-center'>
          <button type='submit' className='btn btn-primary m-3'>
            Submit
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => history.push('/admin/products/')}
          >
            Cancel
          </button>
        </div>
        <br />
        <div>
          <sup className='h6 success'>*</sup> Required
        </div>
      </div>
    </>
  )
}

export default ProductOverview
