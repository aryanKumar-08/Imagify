import User from "../models/user.model.js";
import axios from "axios";

import FormData from "form-data";

export const generateImage = async (req, res)=>{
try {
    const {userId, prompt} = req.body;
    const user = await  User.findById(userId)
    if(!user || !prompt){
        return res.json({success:false, message:"missing details"})
    }
    if(user.credit === 0 || user.credit < 0){
        return res.json({success:false, message:'no credits left', credit : user.credit})
    }
    const formData = new FormData
    formData.append('prompt', prompt)
    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData,{ headers:
        {
               'x-api-key': process.env.CLIP_DROP,
        },
        responseType : 'arraybuffer'
})

const base64Image = Buffer.from(data,'binary').toString('base64')
const resultImage = `data:image/png;base64,${base64Image}`
await User.findByIdAndUpdate(user._id,{credit:user.credit-1})

res.json({success:true, message: "image generated", credit: user.credit-1, resultImage})
    
} catch (error) {
    console.log(error.message)
    res.json({success:false, message: error.message})
}

}