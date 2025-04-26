import React, { useContext } from 'react'
import { motion } from "motion/react"
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'
import axios from 'axios'

const BuyCredits = () => {
  const { user , backendUrl, loadCredits , token, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const initPay = async (order)=>{
     
     const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      description: 'credits payment',
      order_id : order.id,
      receipt : order.receipt,
      
      handler : async (response)=>{
          try {
            const {data} =  await axios.post(backendUrl + '/api/user/verify-razor', response, {headers:{token}})
            if(data.success){
              loadCredits()
              navigate('/')
              toast.success('credits added')
            }
            
          } catch (error) {
            
            toast.error(error.message)
          }
      }
     }
     const rzp = new window.Razorpay(options)
     rzp.open()
  }
  const paymentRazorpay = async (planId)=>{
    try {
      if(!user){
        setShowLogin(true)

      }
     const {data} =  await axios.post(backendUrl + '/api/user/pay-razor' , {planId}, {headers:{token}})
     
     if(data.success){
      initPay(data.order)
     }

    } catch (error) {
     
      toast.error(error.message)
      
    }

  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-16 mb-12'>

      <button className='border border-gray-400 px-12 py-3 text-lg
    rounded-full mb-8 '>Our Plans</button> 
      <h1 className='text-center text-4xl font-semibold mb-8 sm:mb-12'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center gap-8 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-sm border-none rounded-lg py-14 px-10 text-gray-600 hover:scale-110 transition-all duration-500 ' key={index}>
            <img src={assets.logo_icon} alt="" className='w-16' />
            <p className='mt-4 mb-2 text-lg font-semibold'>{item.id}</p>
            <p className='text-md'>{item.desc}</p>
            <p>
              <span className='text-4xl font-bold'>${item.price}</span>/{item.credits} credits
            </p>
            <button  onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-10 text-lg rounded-md py-3 min-w-60 cursor-pointer'>{user ? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default BuyCredits