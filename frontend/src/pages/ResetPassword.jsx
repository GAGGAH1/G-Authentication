import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/house.png' // Assuming you have a logo image in assets
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const ResetPassword = () => {
  const { backendUrl } = useAppContext(); // Assuming you have a context to get backend URL
  axios.defaults.withCredentials = true

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRef = React.useRef([]);

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRef.current[index - 1].focus();    
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = pasteData.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault(); 
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (response.data.success) {
        setIsEmailSent(true);
        toast.success('OTP sent to your email');
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP');
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map(input => input.value).join('');
    setOtp(otpArray);
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      toast.error('New password is required');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      if (response.data.success) {
        toast.success('Password reset successful! Redirecting to login...');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password');
    }
   
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      {/* Enter Email ID */}
      {!isEmailSent &&
      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>Reset Password</h1>
          <p className='text-center mb-6 text-purple-400'>Enter Your Registered Email Address</p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mt-6'>
            <button
              type="submit"
              className='w-full py-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full cursor-pointer'
            >
              Submit
            </button>
          </div>
          <p className='mt-4 text-center text-gray-400 text-sm'>
            Remembered your password? <span className='text-indigo-400 cursor-pointer' onClick={() => navigate('/login')}>Login</span>
          </p>
      </form>
      }
      {/* OTP Input Form */}
      {!isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitOtp}  className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-purple-400'>Enter the 6-digit code sent to your email ID</p>
          <div className='flex justify-between mb-8 'onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index) => (
                  <input  type="text" maxLength="1" key={index} required
                  className='w-12 h-12 text-center bg-slate-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400' 
                  ref={(e) => inputRef.current[index] = e}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
          </div>
          <button className='w-full py-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full cursor-pointer'>Submit</button>
      </form>
      }
      {/* Enter New Password */}
      {isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>New Password</h1>
          <p className='text-center mb-6 text-purple-400'>Enter The New Password Below:</p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='mt-6'>
            <button
              type="submit"
              className='w-full py-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full cursor-pointer'
            >
              Submit
            </button>
          </div>
          <p className='mt-4 text-center text-gray-400 text-sm'>
            Remembered your password? <span className='text-indigo-400 cursor-pointer' onClick={() => navigate('/login')}>Login</span>
          </p>
      </form>
      }
    </div>
  )
}

export default ResetPassword
