import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  getBrandById,
  updatebrand,
} from '../../../functions/admin/brands/brands'
import { getHierarchicalCategories } from '../../../functions/admin/categories/categories'

const EditBrand = ({ history, match }) => {
  /***********************************  Form States  ***************************************/
  const [name, setName] = useState('')
  const [categories, setCategories] = useState('')
  //   const [brandCategories, setBrandCategories] = useState([])
  const [chosenCategories, setChosenCategories] = useState([]) //this will be used to choose new categories
  const [showChosenCategories, setShowChosenCategories] = useState([]) //this will show the categories that have been currenlty part of the brand
  const brandId = match.params.id

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
    console.log(flavors)
    setShowChosenCategories(showSelected)
    setChosenCategories(flavors)
  }

  /***********************************     Submit ***************************************/
  const handleSubmit = (e) => {
    e.preventDefault()
    const brand = {
      id: brandId,
      name,
      image: null,
      brands: chosenCategories,
    }
    console.log(brand)
    updatebrand(brand, brandId).then((res) => {
      if (res.data == 'OK') {
        toast.success(`brand ${name} updated successfully`)
        history.push('/admin/brands')
      } else {
        toast.error('Something went wrong')
      }
    })
  }

  /****************************************** USEEFFECT ********************************************* */
  useEffect(() => {
    //getting all the categories through api call
    getHierarchicalCategories().then((response) => {
      setCategories(response.data.categories)
    })

    //getting that particular brand for edit by id
    getBrandById(brandId)
      .then((res) => {
        setName(res.data.name)

        //the currently chose categories,will be also to add more categories
        for (let i = 0; i < res.data.categories.length; i++) {
          setChosenCategories((prevState) => [
            ...prevState,
            res.data.categories[i].id,
          ])
        }

        //to show the selected categories at the bottom of select scroll
        for (let i = 0; i < res.data.categories.length; i++) {
          console.log(res.data.categories[i].name)
          setShowChosenCategories((prevState) => [
            ...prevState,
            res.data.categories[i].name,
          ])
        }
      })
      .catch((err) => toast.error('Something went wrong'))
  }, [])

  return (
    <div className='container-fluid'>
      <h2>Edit Brand</h2>
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
                defaultValue={showChosenCategories}
                onChange={(e) => {
                  handleSelect(e.target.selectedOptions)
                }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      selected={
                        showChosenCategories.indexOf(
                          category.name.replace(/^-+|-+$/g, '') //the categories to show will not contain -- at start like --smartphone, it will be like smartphone
                        ) != -1 ||
                        showChosenCategories.indexOf(category.name) != -1
                      }
                    >
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

export default EditBrand
