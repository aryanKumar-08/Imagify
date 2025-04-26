import React from 'react'

import { assets, testimonialsData } from '../assets/assets'

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'>
         <h1 className='text-4xl sm:text-5xl font-semibold mb-4'>Customer Testimonials</h1>
         <p className='text-lg text-gray-600 mb-12'>What our users are saying</p>
         <div className='flex flex-wrap gap-8'>
            {
                testimonialsData.map((testimonial, index)=>(
                    <div className='bg-white/20 p-14 rounded-lg shadow-lg order w-96 m-auto cursor-pointer hover:scale-[1.05] transition-all' key = {index}>
                         <div className='flex flex-col items-center'>
                            <img src={testimonial.image} alt="" className='rounded-full w-20' />
                            <h2 className='text-2xl font-semibold mt-4'>{testimonial.name}</h2>
                            <p className='text-gray-500 mb-4 text-lg'>{testimonial.role}</p>
                            <div className='flex mb-4'>
                                {Array(testimonial.stars).fill().map((item,index)=>(
                                    <img key={index} src={assets.rating_star} alt="" className='w-6' />
                                ))}
                            </div>
                            <p className='text-center text-base text-gray-700'>{testimonial.text}</p>
                         </div>
                    </div>
                ))}
         </div>
    </div>
  )
}

export default Testimonials

