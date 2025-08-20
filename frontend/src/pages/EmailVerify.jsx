import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/house.png' // Assuming you have a logo image in assets
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAppContext } from '../context/AppContext'; // Assuming you have a context 


const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRef = React.useRef([]);
  const { backendUrl, user, login, getUserInfo } = useAppContext(); // Assuming you have a context to get backend URL

  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = inputRef.current.map(input => input.value).join('');
    
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    console.log("OTP entered:", otp);
    // Call your API to verify the OTP  
    try {
      const response = await axios.post(`${backendUrl}/api/auth/verify-account`,{otp:otp});
      // Handle successful verification
      if(response.data.success) {
        toast.success('Email verified successfully!');
        login(response.data.data); // Assuming you have a login function in context
        getUserInfo(); // Fetch user info after verification
        navigate('/'); // Redirect to home or dashboard
      } else {
        toast.error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      toast.error('Error during email verification');
    }
  }
  


  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = pasteData.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  }

  useEffect(() => {
      login && user && user.isAccountVerified && navigate('/'); // Redirect if already logged in and email verified
  },[login, user]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <form onSubmit={handleSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>Email Verify OTP</h1>
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
          <button className='w-full py-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full cursor-pointer'>Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify
