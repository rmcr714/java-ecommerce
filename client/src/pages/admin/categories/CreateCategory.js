import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import {
  getHierarchicalCategories,
  createCategory,
} from '../../../functions/admin/categories/categories'

const CreateCategory = ({ history }) => {
  /***********************************  Form States  ***************************************/
  const [name, setName] = useState('')
  const [alias, setAlias] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [categories, setCategories] = useState([])
  const [parentId, setParentId] = useState(0)

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
    const category = {
      name,
      alias,
      enabled,
      image: null,
      parentId,
    }
    createCategory(category)
      .then((response) => {
        toast.success('category created successfully')
        history.push('/admin/categories/')
      })
      .catch((error) => {
        toast.error('something went wrong,check logs')
      })
  }

  /************************************ SELECT A CATEGORY ************************************* */
  const selectCategory = (value) => {
    setParentId(value)
  }

  /****************************************** USE EFFECT *************************************** */
  useEffect(() => {
    getHierarchicalCategories().then((response) => {
      setCategories(response.data.categories)
    })
  }, [])

  return (
    <div className='container-fluid'>
      <h2>Create a new Category</h2>
      <br />
      <form
        style={{ maxWidth: '700px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <div className='border border-secondary rounded p-3'>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Category Name:</label>
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
            <label className='col-sm-4 col-form-label'>Alias:</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='3'
                maxLength='64'
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
          {/* <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Roles:</label>
            <FileUpload
              values={photo}
              setValues={setPhoto}
              loading={loading}
              setLoading={setLoading}
            />
          </div> */}

          <div className='text-center'>
            <button type='submit' className='btn btn-primary m-3'>
              Submit
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => history.push('/admin/users/')}
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
        <p>Entered user email already exists</p>
      </Modal>
    </div>
  )
}

export default CreateCategory
