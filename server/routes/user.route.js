import express from 'express'
import {registerUser, loginUser, creditUser, paymentRazorpay , verifyRazorpay} from '../controllers/user.controller.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits', userAuth ,creditUser)
userRouter.post('/pay-razor', userAuth , paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)

export default userRouter