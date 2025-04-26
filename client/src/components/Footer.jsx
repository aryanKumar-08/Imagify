import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-6 py-4 mt-24 border-none'>
        <img src={assets.logo} alt="" width={170} />
        <p className='flex-1 border-none border-gray-400 pl-4 text-base text-gray-500 max-sm:hidden'>Copyright @aryan.dev | All rights reserved</p>
        <div className='flex gap-3'>
            <img src={assets.facebook_icon} alt="" width={40} />
            <img src={assets.twitter_icon} alt="" width={40} />
            <img src={assets.instagram_icon} alt="" width={40} />
        </div>
    </div>
  )
}

export default Footer
