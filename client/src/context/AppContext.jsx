import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router";
export  const AppContext = createContext()
const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin , setShowLogin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(null)
 


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const loadCredits = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/credits', {headers:{token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image' , {prompt} , {headers:{token}})
            if(data.success){
                loadCredits()
                return data.resultImage
            }
            else{
                if (data.credit !== undefined && data.credit === 0) {
                    navigate('/buycredits');
                }
                toast.error(data.message || "Failed to generate image");
                loadCredits();

            }
            
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        // Handle scenario where user has zero credits and an error occurs
        if (error.response?.data?.credit === 0) {
            navigate('/buycredits');
        }
            
        }

    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)

    }

    useEffect(()=>{
        if(token){
            loadCredits()
        }

    }, [token])

    const value = {
         user, setUser , showLogin, setShowLogin , backendUrl, token, setToken, credit, setCredit, loadCredits, logout , generateImage
    }

    return(
      
        <AppContext.Provider value = {value}>
         {props.children}
        </AppContext.Provider>

    )

}
export default AppContextProvider