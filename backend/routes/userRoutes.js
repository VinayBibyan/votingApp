const express = require('express');
const router = express.Router();
const user = require('../models/userSchema');
const {jwtAuthMiddleware, generateToken} = require('../jwt')

router.post('/signup', async(req, res)=>{
    try { 
        const data = req.body;
        const adminUser = await user.findOne({role: 'admin'});
        //to check whether admin already exists or not
        if(data.role === 'admin' && adminUser){
            return res.status(401).json({ error: 'Admin already exists' });
        }
        
        const newUser = new user(data);
        const savedUser = await newUser.save();
        const payload = {
            name: savedUser.name,
            id: savedUser.id
        }
        const token = generateToken(payload);
        res.status(200).json({response: savedUser, token: token});
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/login', async(req, res)=>{
    try {
        //extract aadharCardNumber and password from req body
        const {aadharCardNumber, password} = req.body;
        //find the user by username
        const response = await user.findOne({aadharCardNumber: aadharCardNumber});
        //if user does not exist or password does not exist
        if(!response || !(await response.comparePassword(password))){
            return res.status(401).json({error: "user does not exist or password does not exist"});
        }
        //generate token
        const payload = {
            id: response.id,
            username: response.name
        }
        const token = generateToken(payload);
        const role = response.role;
        res.json({token, role});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/profile', jwtAuthMiddleware, async(req, res) =>{
    try {
        const userData = req.user;
        console.log(userData);

        const userId = userData.id;
        const response = await user.findById(userId);

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/profile/changePassword', jwtAuthMiddleware,  async(req, res)=>{
    try {
        const userId = req.user.id; //extract id from token
        const {currentPassword, newPassword} = req.body //extract current and new password from req body
        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }
        //find user by id
        const response = await user.findById(userId);
        // if password does not match return error
        if(!response || !(await response.comparePassword(currentPassword))){
            return res.status(401).json({error: "password does not match"});
        }
        //update user's password
        response.password = newPassword;
        await response.save();

        console.log('password updated');
        res.status(200).json({message: 'password updated'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

router.get('/adminExists', async (req, res) => {
    try {
        const admin = await user.findOne({ role: 'admin' });
        res.json({ adminExists: !!admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;