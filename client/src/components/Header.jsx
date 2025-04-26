import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true);
        }
    }
    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-24'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <motion.div className='text-stone-500 inline-flex text-center gap-3 bg-white px-7 py-2 text-lg rounded-full border border-neutral-500'
                initial={{ opacity: 0.2, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}>
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" className='h-5' />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
                className='text-5xl max-w-[350px] sm:text-7xl sm:max-w-[640px] mx-auto mt-12 text-center'>
                Turn text to <span className='text-blue-700'>image</span>, in seconds.
            </motion.h1>

            <p className='text-center text-lg max-w-2xl mx-auto mt-6'>Unleash your creativity with AI. Turn your imagination into visual art in seconds—just type, and watch the magic happen.</p>
            
            <motion.button
                onClick={onClickHandler}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                className='sm:text-xl text-white bg-black w-auto mt-10 px-14 py-3 flex items-center gap-3 rounded-full cursor-pointer'>
                Generate images
                <img className='h-7' src={assets.star_group} alt="" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className='flex flex-wrap justify-center mt-20 gap-4'>
                {
                    Array(6).fill('').map((item, index) => (
                        <motion.img whileHover={{ scale: 1.07, duration: 0.1 }} className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-12'
                            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt=""
                            key={index} width={80} />
                    ))
                }
            </motion.div>
            
            <p className='mt-3 text-lg text-neutral-600'>Generated images from imagify</p>
        </motion.div>
    )
}

export default Header
