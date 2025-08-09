import React from 'react'
import HeroInfo from './HeroInfo'
import AuthImage from '../assets/images/Auth.webp'
const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${AuthImage})` }}
    >
      {/* Optional overlay for better readability */}
      <div className="absolute"></div>

      {/* Content on top of the background image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <HeroInfo />
      </div>
    </div>
  )
}

export default Hero
