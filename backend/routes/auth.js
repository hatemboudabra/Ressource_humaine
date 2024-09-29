const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User');


const router = express.Router();
//register
router.post('/register',async (req,res)=>{
    try{
            const userq=req.body;
            const user = new User(userq)
            await user.save();
            res.status(201).send('User registered successfully') 
    } catch (error){
        res.status(400).send(error.message);
    }

})
//login
router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).send('password invalid')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.send({token:token})
    } catch (err){
            res.status(400).send(err.message);
    }
})

module.exports = router;