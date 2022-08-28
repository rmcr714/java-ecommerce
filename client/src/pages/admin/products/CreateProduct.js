import React, { useEffect, useState } from 'react'
import ProductDescription from './ProductDescription'
import ProductOverview from './ProductOverview'

const CreateProduct = () => {
  /***********************************OVERVIEW STATE ***************************************** */
  /****
   * The OVERVIEW COMPONENT CONTAINS ITS STATES, WE PASS THE DESCRIPTION STATE TOT THE PRODUCT OVERVIEW COMPONENT
   * BECAUSE ITS THE MAIN COMPONENT AND SAVE BUTTON TO SAVE THE PRODUCT IS PRESENT ON THAT COMPONENT.
   * THE STATES FOR DESCRIPTION, SHIPPING ARE PROVIDED ON THIS PAGE AND PASSED AS PROPES TO DESCRIPTION ,SHIPPING,IMAGES COMPONENTS
   *
   **/

  /*******************************DESCRIPTION STATE*************************** */
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')

  /***********************************     Submit ***************************************/

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='container-fluid'>
      <h2>Create a new Product</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <ul class='nav nav-tabs' id='myTab' role='tablist'>
            <li class='nav-item'>
              <a
                class='nav-link active'
                id='home-tab'
                data-toggle='tab'
                href='#overview'
                role='tab'
              >
                Overview
              </a>
            </li>
            <li class='nav-item'>
              <a
                class='nav-link'
                id='profile-tab'
                data-toggle='tab'
                href='#description'
                role='tab'
              >
                Description
              </a>
            </li>
            <li class='nav-item'>
              <a
                class='nav-link'
                id='messages-tab'
                data-toggle='tab'
                href='#images'
                role='tab'
                aria-controls='messages'
                aria-selected='false'
              >
                Images
              </a>
            </li>
            <li class='nav-item'>
              <a
                class='nav-link'
                id='settings-tab'
                data-toggle='tab'
                href='#details'
                role='tab'
                aria-controls='settings'
                aria-selected='false'
              >
                Details
              </a>
            </li>
            <li class='nav-item'>
              <a
                class='nav-link '
                id='shipping-tab'
                data-toggle='tab'
                href='#shipping'
                role='tab'
                aria-controls='settings'
                aria-selected='false'
              >
                Shipping
              </a>
            </li>
          </ul>

          <div class='tab-content'>
            <div
              class='tab-pane active'
              id='overview'
              role='tabpanel'
              aria-labelledby='home-tab'
            >
              <ProductOverview
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                longDescription={longDescription}
                setLongDescription={setLongDescription}
              />
            </div>
            <div
              class='tab-pane'
              id='description'
              role='tabpanel'
              aria-labelledby='profile-tab'
            >
              <ProductDescription
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                longDescription={longDescription}
                setLongDescription={setLongDescription}
              />
            </div>
            <div
              class='tab-pane'
              id='images'
              role='tabpanel'
              aria-labelledby='messages-tab'
            >
              Images
            </div>
            <div
              class='tab-pane'
              id='details'
              role='tabpanel'
              aria-labelledby='settings-tab'
            >
              Details
            </div>
            <div class='tab-pane' id='shipping' role='tabpanel'>
              Shipping
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
