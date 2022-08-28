import React from 'react'

const ProductDescription = ({
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription,
}) => {
  /***********************************  Form States  ***************************************/

  return (
    <>
      <div className='  rounded p-3'>
        <label>
          <b> Short Description:</b>
          <sup className='h6'>*</sup>{' '}
        </label>
        <textarea
          className='form-control'
          rows={3}
          required
          value={shortDescription}
          maxLength={512}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>

      <br />
      <div className='  rounded p-3'>
        <label>
          <b> Long Description:</b>
          <sup className='h6'>*</sup>{' '}
        </label>
        <textarea
          className='form-control'
          rows={6}
          required
          value={longDescription}
          maxLength={4096}
          onChange={(e) => setLongDescription(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <sup className='h6 success'>*</sup> Required
      </div>
    </>
  )
}

export default ProductDescription
