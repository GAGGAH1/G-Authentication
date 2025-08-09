import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-300 flex items-center justify-center text-white p-4 '>
        <p className=''>Copyright © {new Date().getFullYear()} - All right reserved by The Creator</p>
    </div>
  )
}

export default Footer
