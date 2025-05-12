import React from 'react'

const Banner = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center ">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4 sm:text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
