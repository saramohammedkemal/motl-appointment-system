import React from 'react'
import Header from '../pages/Header'


function Layout({children}) {
  return (
    <div>
        <Header/>
        <div className='child'><main>{children}</main></div>
    </div>
  )
}

export default Layout