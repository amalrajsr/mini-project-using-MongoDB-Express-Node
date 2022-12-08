const express=require('express')
const user_router=express.Router()
const userController=require('../Controllers/userController')



user_router.get('/',userController.userLogin)

user_router.post('/',userController.userVerfication)

user_router.get('/signup',userController.registerUser)

user_router.post('/signup',userController.userSignup)

user_router.get('/home',userController.userHome)

user_router.get('/logout',userController.userLogout)

module.exports=user_router