import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../functions/admin'
import { Link } from 'react-router-dom'
import { deleteUser } from '../../../functions/admin'
import { toast } from 'react-toastify'

const AllUsers = ({ history }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    console.log('runing')
    getAllUsers().then((response) => {
      setUsers(response.data)
      console.log(response.data)
    })
    setLoading(false)
  }, [])

  const deleteUsers = (id) => {
    console.log(id)

    if (window.confirm('Confirm to delete user id ' + id)) {
      deleteUser(id)
        .then((res) => {
          if (res.data == 'OK') {
            toast.success('User successfully deleted')
            setLoading(true)
            getAllUsers().then((response) => {
              setUsers(response.data)
            })
            setLoading(false)
          }
        })
        .catch((err) => {
          toast.error(`user with id ${id} does not exist`)
        })
    }
  }

  return (
    <div className='container-fluid'>
      <br />

      <h2>Manage Users</h2>
      <Link
        onClick={() => history.push('/admin/users/create')}
        style={{ textDecoration: 'none' }}
      >
        Create New User
      </Link>
      <table className='table table-bordered table-striped table-hover table-responsive-xl'>
        <thead className='thead-dark'>
          <tr>
            <th>User Id</th>
            <th>Photo</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roles</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </thead>
        {loading ? (
          <div className='spinner-border  m-4' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>
                    <span className='fas fa-portrait fa-2x icon-silver'></span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    {user.roles.map((role) => (
                      <span>{role.name},&nbsp;</span>
                    ))}
                  </td>
                  <td>
                    {user.enabled ? (
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
                        history.push(`/admin/users/edit/${user.id}`)
                      }
                    ></a>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      className='fas fa-trash fa-2x '
                      style={{ color: 'gray' }}
                      onClick={(e) => deleteUsers(user.id)}
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
        )}
      </table>
    </div>
  )
}

export default AllUsers
