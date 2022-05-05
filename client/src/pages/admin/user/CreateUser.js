import React, { useEffect, useState } from 'react'
import {
  getAllRoles,
  createUser,
  checkDuplicateEmail,
} from '../../../functions/admin/users/users'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
// import FileUpload from '../../../components/forms/FileUpload'

const CreateUser = ({ history }) => {
  /***********************************  Form States  ***************************************/
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [userRoles, setUserRoles] = useState([0, 0, 0, 0, 0])
  // const [photo, setPhoto] = useState({})

  /***********************************  modal States  ***************************************/
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    getAllRoles().then((response) => {
      setRoles(response.data)
    })
  }, [])

  const handleCheckBoxChange = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      console.log(e.target.value)
      const value = userRoles
      value[e.target.value] = e.target.value
      setUserRoles([...value])
    } else {
      const value = userRoles
      value[e.target.value] = 0
      setUserRoles([...value])
    }
    console.log(userRoles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email,
      firstName,
      lastName,
      password,
      photos: null,
      enabled,
      roles: userRoles,
    }

    checkDuplicateEmail(email).then((response) => {
      if (response.data === 'OK') {
        createUser(user).then((response) => {
          if (response.data === 'OK') {
            history.push('/admin/users/')
            toast.success('User is created Successfully')
          } else {
            toast.error('Something went wrong')
          }
        })
      } else {
        setIsModalVisible(true)
      }
    })
  }

  return (
    <div className='container-fluid'>
      <h2>Create a new User</h2>
      <br />
      <form
        style={{ maxWidth: '700px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <div className='border border-secondary rounded p-3'>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Email:</label>
            <div className='col-sm-8'>
              <input
                type='email'
                className='form-control'
                required
                minLength='7'
                maxLength='128'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>First Name:</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='2'
                maxLength='45'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Last Name:</label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                required
                minLength='2'
                maxLength='45'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Password:</label>
            <div className='col-sm-8'>
              <input
                type='password'
                className='form-control'
                required
                minLength='8'
                maxLength='20'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Roles:</label>
            <div className='col-sm-8'>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <>
                    <input
                      key={index}
                      type='checkbox'
                      value={role.id}
                      onChange={(e) => handleCheckBoxChange(e)}
                    />
                    <span>
                      {role.name}:&nbsp; <small>{role.description}</small>
                    </span>
                    <br />
                  </>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label'>Roles:</label>
            <div className='col-sm-8'>
              <input
                type='checkbox'
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              Enabled
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

export default CreateUser
