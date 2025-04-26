import jwt from 'jsonwebtoken'
const userAuth =  async (req, res, next)=>{
      const {token} = req.headers;
      if(!token){
        console.log("token not found");
        return  res.json({success :false, message:'Not authorized'})

      }

      try {
        const tokenDecoded =   jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecoded){
            req.body.userId = tokenDecoded.id;
        }
        else{
            return res.json({success: false, message : 'not authorized'})
        }

        next();
      } catch (error) {
        console.log("authorization failed")
        res.json({success:false, message:"authorization failed"})
        
      }

}

export default userAuth
