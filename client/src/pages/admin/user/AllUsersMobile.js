import React from 'react'
import { useHistory } from 'react-router-dom'

/*********************************************************MOBILE VIEW FOR ALL USERS PAGE **************************/
const AllUsersMobile = ({ users, deleteUsers }) => {
  let history = useHistory()
  return (
    <div className='less-details'>
      <h5>User Details</h5>
      {users.length > 0 ? (
        users.map((user) => (
          <>
            <div className='row m-1'>
              <div className='col-4'>
                <span className='fas fa-portrait fa-2x icon-silver'></span>
              </div>
              <div className='col-8'>
                <div>
                  {user.firstName}&nbsp;{user.lastName}
                </div>
                <div>
                  <b>Roles: </b>
                  {user.roles.map((role) => (
                    <span>{role.name},&nbsp;</span>
                  ))}
                </div>
                <a
                  className='fas fa-edit fa-2x icon-green'
                  style={{ color: 'green' }}
                  onClick={(e) => history.push(`/admin/users/edit/${user.id}`)}
                ></a>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <a
                  className='fas fa-trash fa-2x '
                  style={{ color: 'gray' }}
                  onClick={(e) => deleteUsers(user.id)}
                ></a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              </div>
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
  )
}

export default AllUsersMobile
