import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'

const GenerateBtn = () => {
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
        <div className='pb-20 text-center'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl mt-6 font-semibold text-neutral-800 py-8 md:py-20'>See the magic. Try now</h1>
            <button onClick={onClickHandler} className='inline-flex items-center gap-3 px-14 py-4 rounded-full bg-black text-white m-auto text-lg hover:scale-110 transition-all duration-500 cursor-pointer'>
                Generate Images
                <img src={assets.star_group} alt="" className='h-7' />
            </button>
        </div>
    )
}

export default GenerateBtn

