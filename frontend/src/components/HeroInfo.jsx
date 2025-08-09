import { Link } from 'react-router-dom'

const HeroInfo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">My Dev</h1>
        <h2 className="text-2xl font-semibold text-gray-600">Welcome to my Auth App</h2>
        <p className="text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam placeat eum quidem aliquid quas facere iste repellat aliquam.
        </p>

        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login to Get Started
        </Link>
      </div>
    </div>

  )
}

export default HeroInfo
