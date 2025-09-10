import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const HeroInfo = () => {
  const { user, logout } = useAppContext();
  console.log('User in HeroInfo:', user);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className=" rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">Hi {user ? user.name : 'Dev'} </h1>
        <h2 className="text-2xl font-semibold text-white">Welcome to my Auth App</h2>
        <p className="text-white leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat eum quidem aliquid quas facere iste repellat aliquam.
        </p>

        <Link
          to="/login"
          className="inline-block slate-blue-900 text-white px-6 py-3 shadow-md font-bold rounded-md hover:slate-blue-700 transition duration-300 "
        >
          Login to Get Started
        </Link>
      </div>
    </div>

  )
}

export default HeroInfo
