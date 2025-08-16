import {Link} from "react-router-dom";


const Navbar = () => {
  
  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between items-center'>
       <h1>Logo</h1>
        <ul className='flex items-center space-x-8'>
            <Link to="/"><li>Home</li></Link>
            <Link to="/login"><button className='cursor-pointer px-6 py-2 border border-amber-500 rounded-full hover:bg-amber-900 transition-colors'>Login</button></Link>
        </ul>
    </nav>
  )
}

export default Navbar
