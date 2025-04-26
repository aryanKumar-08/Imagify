import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import Transaction from "../models/transaction.model.js";
import dotenv from 'dotenv';
import { SchemaTypeOptions } from "mongoose";
// import { FormData } from "form-data";

dotenv.config();
const registerUser =  async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:"fill all the details"})
        }
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new User(userData)
        const user = await newUser.save()
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)
        res.json({success:true, token, user :{name:user.name}})
        
    } catch (error) {
        console.log("error occured while registering the user")
        res.json({success:false,message:error.message})
        
    

   }
}

// contoller for user login
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user =  await User.findOne({email})
        if(!user){
            return res.json({success:false, message:"user not found"}) }
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)
                res.json({success:true, token, user :{name:user.name}})

            }
            else{
                return res.json({success:false, message: "invalid credentials"})
            }
        
    } catch (error) {
        console.log("error occured while registering the user")
        res.json({success:false,message:error.message})


        
    }


}
// controller for accessing the user credits
const creditUser = async (req, res)=>{
    try {
        const {userId} = req.body;
        const user = await User.findById(userId)
        res.json({success:true, credits:user.credit, user:{name:user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }

}

const razorpayInstance = new razorpay({
   
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing details" });
        }

        const userData = await User.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let credits, plan, amount ;
        switch (planId) {
            case "Basic":
                plan = "Basic";
                credits = 100;
                amount = 10;
                break;
            case "Advanced":
                plan = "Advanced";
                credits = 500;
                amount = 50;
                break;
            case "Business":
                plan = "Business";
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Plan not found" });
        }

        const date = Date.now();
        const transactionData = { userId, plan, amount, credits, date };
        const newTransaction = await Transaction.create(transactionData);

        const options = {
            amount: amount * 100, // Convert to paise
            currency: process.env.CURRENCY || "INR",
            receipt: newTransaction._id.toString(),
        };

        console.log("Creating Razorpay order with options:", options);

        // Razorpay order creation
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.error("Payment Error:", error);
        res.json({ success: false, message: error.message });
    }

};





const verifyRazorpay = async(req, res)=>{
    try {
        const {razorpay_order_id} = req.body;
        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderinfo.status !== 'paid'){
            return res.json({success:false, message:'payment not completed'})
        }

        const transactionData = await Transaction.findById(orderinfo.receipt)
        if(!transactionData){
            return res.json({success:false, message:'transaction not found'})
        }

        if(transactionData.payment){
            return res.json({success:false, message:'payment already processed'})
        }

        const userData = await User.findById(transactionData.userId)
        if(!userData){
            return res.json({success:false, message:'user not found'})
        }

        const credit = userData.credit + transactionData.credits
        await User.findByIdAndUpdate(userData._id, {credit})
        await Transaction.findByIdAndUpdate(transactionData._id, {payment:true})
        
        res.json({success:true, message:'credits added'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


export {registerUser,loginUser, creditUser , paymentRazorpay, verifyRazorpay}