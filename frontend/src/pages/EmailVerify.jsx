import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/house.png' // Assuming you have a logo image in assets

const EmailVerify = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1>Email Verify OTP</h1>
          <p>Enter the 6-digit code sent to your email ID</p>
      </form>
    </div>
  )
}

export default EmailVerify
