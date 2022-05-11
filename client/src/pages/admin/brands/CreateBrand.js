import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getHierarchicalCategories } from '../../../functions/admin/categories/categories'
import { createbrand } from '../../../functions/admin/brands/brands'

const CreateBrand = ({ history }) => {
  /***********************************  Form States  ***************************************/
  const [name, setName] = useState('')
  const [categories, setCategories] = useState('')
  const [chosenCategories, setChosenCategories] = useState([])
  const [showChosenCategories, setShowChosenCategories] = useState([])

  /**************************************** Select Multiple Categories ********************** */
  const handleSelect = function (selectedItems) {
    const flavors = []
    const showSelected = []
    for (let i = 0; i < selectedItems.length; i++) {
      flavors.push(selectedItems[i].value)
      const index = categories.findIndex(
        (element) => element.id == selectedItems[i].value
      )
      if (index != -1) {
        showSelected.push(categories[index].name)
      }
    }
    // console.log(showSelected)
    // console.log(flavors)
    setShowChosenCategories(showSelected)
    setChosenCategories(flavors)
  }

  /***********************************  modal States  ***************************************/
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  /***********************************     Submit ***************************************/
  const handleSubmit = (e) => {
    e.preventDefault()
    const brand = {
      name,
      image: null,
      brands: chosenCategories,
    }
    createbrand(brand)
      .then((response) => {
        toast.success('brand created successfully')
        history.push('/admin/brands/')
      })
      .catch((error) => {
        toast.error('something went wrong,check logs')
      })
  }

  /****************************************** USEEFFECT ********************************************* */
  useEffect(() => {
    //getting all the categories through api call
    getHierarchicalCategories().then((response) => {
      setCategories(response.data.categories)
    })
  }, [])

  return (
    <div className='container-fluid'>
      <h2>Create a new Brand</h2>
      <br />
      <form
        style={{ maxWidth: '700px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <div className='border border-secondary rounded p-3'>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Brand Name:</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='3'
                maxLength='128'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>
              Select Categories :
            </label>
            <div className='col-sm-8'>
              <select
                className='form-control'
                multiple={true}
                // onChange={(event) => selectCategory(event.target.value)}
                onChange={(e) => {
                  handleSelect(e.target.selectedOptions)
                }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
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
            <label className='col-sm-4 col-form-label'>Chosen Categories</label>
            <div className='col-sm-8'>
              {showChosenCategories.map((category) => (
                <span className='badge badge-secondary m-1 '>
                  {category}&nbsp;
                </span>
              ))}
            </div>
          </div>

          <div className='text-center'>
            <button type='submit' className='btn btn-primary m-3'>
              Submit
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => history.push('/admin/brands/')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateBrand
