import {Link, useNavigate} from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, backendUrl, login } = useAppContext();


  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      const response = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, { email: user.email });
      if (response.data.success) {
        navigate('/email-verify');
        toast.success('Verification OTP sent to your email');
      } else {
        toast.error(response.data.message || 'Failed to send verification OTP');
      }
    } catch (error) {
      toast.error('Error sending verification OTP');
      console.error('Error sending verification OTP:', error);
    }

  };

  const Logout = async () => {
    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

     const response = await axios.post(`${backendUrl}/api/auth/logout`);
      if (response.data.success) {
        setUser(null);
        toast.success('Logout successful');
        navigate('/')
      } else {
        toast.error(response.data.message || 'Logout failed');
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };
  return (
    <nav className='w-full bg-gray-800 text-white p-4 sm:p-6 sm:px-24 flex justify-between items-center absolute z-50'>
       <h1>Logo</h1>
       {user ? 
       <div className="w-8 h-8 flex items-center justify-center bg-amber-500 rounded-full text-black font-bold relative group">
          {user.name[0].toUpperCase()}
          <div className="absolute right-0 top-0 text-black rounded pt-10 hidden group-hover:block z-10">
            <ul className="list-none  bg-blue-300 m-0 p-2 text-sm">
              {!user.isAccountVerified && 
              <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-blue-200 cursor-pointer">Verify Email</li>
              }
              <li onClick={Logout} className="py-1 px-2 hover:bg-blue-200 cursor-pointer pr-10">Logout</li>
            </ul>
          </div>
       </div>
      : 
        <Link to="/login"><button className='cursor-pointer px-6 py-2 border border-amber-500 rounded-full hover:bg-amber-900 transition-colors'>Login</button></Link>
       
      }
        
    </nav>
  )
}

export default Navbar
