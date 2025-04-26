import React, { useContext } from 'react'
import { Routes ,Route } from 'react-router'
import Home from './pages/Home'
import BuyCredits from './pages/BuyCredits'
import Result from './pages/Result'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer} from 'react-toastify';


const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position = 'bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
      
      <Route path ='/' element = {<Home/>}/>
      <Route path ='/buycredits' element = {<BuyCredits/>}/>
      <Route path ='/result' element = {<Result/>}/>
     
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
