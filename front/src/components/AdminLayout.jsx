import React from 'react'
import PagesHead from '../pages/admin/PagesHead'
import AdSidebar from '../pages/admin/AdSidebar'

function AdminLayout({children}) {
  return (
    <div>
        {/* <PagesHead/> */}
       <div className='flex'>
         <AdSidebar className='sidebar'/>
        <main className='main'>{children}</main></div>
        
    </div>
  )
}

export default AdminLayout