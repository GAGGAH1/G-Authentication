import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/house.png' // Assuming you have a logo image in assets

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRef = React.useRef([]);

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && index > 0 && e.target.value.length === '') {
      inputRef.current[index - 1].focus();    
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputRef.current.map(input => input.value).join('');
    // Here you would typically send the OTP to your backend for verification
    console.log('OTP submitted:', otp);
    // Navigate to a success page or show a success message
    navigate('/success');
  }
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    pasteData.split('').forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
        inputRef.current[index].dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    );
    inputRef.current[pasteData.length - 1].focus();
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white text-sm sm:text-base'>
          <h1 className='text-white text-2xl font-semibold text-center mb-6'>Email Verify OTP</h1>
          <p className='text-center mb-6 text-purple-400'>Enter the 6-digit code sent to your email ID</p>
          <div className='flex justify-between mb-8'>
                {Array(6).fill(0).map((_, index) => (
                  <input  type="text" maxLength="1" key={index} required
                  className='w-12 h-12 text-center bg-slate-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400' 
                  ref={(e) => inputRef.current[index] = e}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
          </div>
          <button className='w-full py-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full'>Verify Email</button>
      </form>
    </div>
  )
}

export default EmailVerify
