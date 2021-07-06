import React from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const HeaderAdmin = () => {
  return (
    <div className='container-fluid'>
      <div>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link style={{ textDecoration: 'none', color: 'white' }}>Navbar</Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#topNavbar'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='topNavbar'>
            <ul class='navbar-nav'>
              <li class='nav-item active'>
                <a class='nav-link' href='/users'>
                  &nbsp; Users <span class='sr-only'>(current)</span>
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/categories'>
                  &nbsp; Categories
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/brands'>
                  &nbsp; Brands
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/products'>
                  &nbsp; Products
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/customers'>
                  &nbsp; Customers
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/shipping'>
                  &nbsp; Shipping
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/report'>
                  &nbsp; Sales Report
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/articles'>
                  &nbsp; Articles
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/menus'>
                  &nbsp; Articles
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/settings'>
                  &nbsp;settings
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default HeaderAdmin
