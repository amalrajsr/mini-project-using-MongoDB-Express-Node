const express=require('express')

const admin_router=express.Router();
const adminController=require('../Controllers/adminController')


admin_router.get('/admin',adminController.adminLogin)

admin_router.post('/admin',adminController.adminVerification)

admin_router.get('/adminhome',adminController.adminHome)

admin_router.get('/adminlogout',adminController.adminLogout)

admin_router.get('/addUser',adminController.addUser)

admin_router.post('/addUser',adminController.addUserFunction)

admin_router.get('/editUser',adminController.editUser)

 admin_router.post('/editUser',adminController.editUserFunction)

 admin_router.get('/deleteUser',adminController.userDelete)


module.exports=admin_router