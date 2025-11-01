const express = require('express');

const authRouter = express.Router();
const {register, login, logout,adminRegister} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
// register
authRouter.post('/register',register);
// login
authRouter.post('/login',login);
// logout
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register',adminMiddleware , adminRegister);
authRouter.delete('/deleteProfile',userMiddleware,deleteProfile); 
// Get profile
// authRouter.get('getProfile',getProfile);



module.exports = authRouter;

