import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/house.png' // Assuming you have a logo image in assets
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>Reset Password</h1>
          <p className='text-center mb-6 text-purple-400'>Enter Your Registered Email Address</p>
      </form>
    </div>
  )
}

export default ResetPassword
