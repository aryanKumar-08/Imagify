import React from 'react'
import { Link, useNavigate } from 'react-router'
import { assets } from "../assets/assets"
import App from '../App'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {user , setShowLogin , logout , credit} = useContext(AppContext)
 
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between py-5'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 lg:w-48' />
      </Link>

      <div>
        {user ?
          //if the user is logged in
          <div className='flex items-center gap-3 sm:gap-4'>
            <button  onClick={() => navigate('/buycredits')} className='flex items-center gap-3 bg-blue-100 px-5 sm:px-7 py-2 sm:py-4 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-6' src={assets.credit_star} alt="" srcset="" />
              <p className='text-sm sm:text-base font-medium text-gray-600'>Credits left: {credit}</p>
            </button>
            
            <p className='text-gray-600 max-sm:hidden pl-5 text-lg'>Hi, {user.name}</p>
            <div className='relative group'>
              <img className='w-12 drop-shadow' src={assets.profile_icon} alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-14'>
                <ul className='list-none m-0 p-0 bg-white rounded-md border text-base'>
                  <li onClick={logout} className='py-2 px-3 cursor-pointer pr-12'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
          : 
          <div className='flex items-center gap-3 sm:gap-6'>
            <p onClick={() => navigate('/buycredits')} className='cursor-pointer text-lg'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-9 py-3 sm:px-12 text-base rounded-full cursor-pointer'>Log In</button>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
