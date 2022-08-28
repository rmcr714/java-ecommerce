import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import {
  getCategoryById,
  getHierarchicalCategories,
  updateCategory,
} from '../../../functions/admin/categories/categories'
import { toast } from 'react-toastify'

const EditCategory = ({ history, match }) => {
  /****************************************** STATE TO HOLD USER DATA TO EDIT **************************** */
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [alias, setAlias] = useState('')
  const [parentId, setParentId] = useState(0)
  const [parentName, setParentName] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [categories, setCategories] = useState([])
  const categoryId = match.params.id

  /********************************************** MODAL STATES AND FUNCTIONS*****************************/
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  /*******************************USEEFFECT ************************************************************* */
  useEffect(() => {
    /**************************  GET A SINGLE CATEGORY BY ID **************************************************** */
    getCategoryById(categoryId).then((res) => {
      setName(res.data.name)
      setAlias(res.data.alias)
      setEnabled(res.data.enabled)
      if (res.data.parent != null) {
        setParentId(res.data.parent.id)
        setParentName(res.data.parent.name)
      }
    })

    /**************************  GET ALL CATEGORIES BY ID ******************************************************** */
    getHierarchicalCategories().then((response) => {
      setCategories(response.data.categories)
    })
  }, [])

  /************************************ SELECT A CATEGORY ************************************* */
  const selectCategory = (value) => {
    setParentId(value)
  }

  /***************************************************SUBMIT AFTER EDIT***********************************/
  const handleSubmit = (e) => {
    e.preventDefault()
    const category = {
      name,
      alias,
      image: null,
      enabled,
      parentId,
    }
    console.log(category)

    updateCategory(category, categoryId).then((res) => {
      if (res.data == 'OK') {
        toast.success('Category updated successfully')
        history.push('/admin/categories')
      } else {
        toast.error('Something went wrong')
      }
    })
  }
  return (
    <div className='container-fluid'>
      <h2>Update the category</h2>
      <br />
      <form
        style={{ maxWidth: '700px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <div className='border border-secondary rounded p-3'>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Category Name :</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='5'
                maxLength='128'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Alias :</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='5'
                maxLength='128'
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Parent Category :</label>
            <div className='col-sm-8'>
              <select
                className='form-control'
                onChange={(event) => selectCategory(event.target.value)}
              >
                {<option value={parentId}>{parentName}</option>}
                <option value='0'>Parent</option>_
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
            <label className='col-sm-4 col-form-label'>Enabled:</label>
            <div className='col-sm-8'>
              <input
                type='checkbox'
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
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
              onClick={(e) => history.push('/admin/categories')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <Modal
        title='Warning'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Entered category email already exists</p>
      </Modal>
    </div>
  )
}

export default EditCategory
