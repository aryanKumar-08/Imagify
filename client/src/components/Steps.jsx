import React from 'react'
import {stepsData} from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
      <h1 className='text-4xl sm:text-5xl font-semibold mb-4'>How it works</h1>
      <p className='text-xl text-gray-600 mb-10'>Transform your words into stunning images</p>

      <div className='space-y-6 w-full max-w-3xl text-base'>
        {stepsData.map((item, index)=>(
              <div key = {index} 
              className='flex items-center gap-6 p-6 px-10 bg-white/20 shadow-md border-rounded cursor-pointer hover:scale-[1.05] transition-all duration-300'>
                <img width={50} src= {item.icon} alt="" />
                <div>
                  <h2 className='text-2xl font-medium'>{item.title}</h2>
                  <p className='text-gray-500 text-lg'>{item.description}</p>
                </div>
              </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
