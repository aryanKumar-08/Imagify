import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Login')
    const {showLogin ,setShowLogin, backendUrl , setToken ,setUser } = useContext(AppContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

     const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
             if (state === 'Login') {
                const {data} = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {

                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }
                else {
                    toast.error(data.message)
                }

            }

        } catch (error) {

            toast.error(error.message)

        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    })
    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 ${showLogin ? 'z-50' : 'z-0'} backdrop-blur-sm bg-black/30 flex justify-center items-center`}>
            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}

                className='relative bg-white p-12 rounded-xl text-slate-600 w-96'>
                <h1 className='text-center text-3xl text-neutral-800 font-bold'>{state}</h1>
                <p className='text-md text-center'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border px-6 py-3 flex items-center gap-3 rounded-full mt-6'>
                    <img src={assets.profile_icon} alt="" className='w-14 h-14' />
                    <input onChange={e => setName(e.target.value)} value = {name} type="text" placeholder='Full Name' required className='outline-none text-md w-full' />
                </div>}

                <div className='border px-6 py-3 flex items-center gap-3 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" className='w-12 h-14' />
                    <input onChange={e => setEmail(e.target.value)} value = {email} type="email" placeholder='Email ID' required className='outline-none text-md w-full' />
                </div>

                <div className='border px-6 py-3 flex items-center gap-3 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" className='w-12 h-13' />
                    <input onChange={e => setPassword(e.target.value)} value = {password} type="password" placeholder='Password' required className='outline-none text-md w-full' />
                </div>

                <p className='text-blue-500 text-center mt-2 cursor-pointer'>Forgot password?</p>
                <button className='bg-blue-600 w-full text-white py-3 rounded-full mt-4 text-lg font-semibold hover:bg-blue-700 transition'>
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </button>

                {state === 'Login' ? <p className='mt-6 text-center text-md'>Don't have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => { setState('Sign Up') }}>Sign Up</span></p>
                    :
                    <p className='mt-6 text-center text-md'>Already have an account? <span className='text-blue-600 cursor-pointer font-semibold' onClick={() => { setState('Login') }}>Log In</span></p>}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-6 right-6 cursor-pointer w-8 h-8' />
            </motion.form>

        </div>
    )
}

export default Login
