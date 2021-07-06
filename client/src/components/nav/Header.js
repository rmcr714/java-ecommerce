import React, { useState } from 'react'
import HeaderAdmin from './HeaderAdmin'

const Header = () => {
  const [ok, SetOk] = useState(true)
  return ok ? <HeaderAdmin /> : <div>Hey</div>
}

export default Header
