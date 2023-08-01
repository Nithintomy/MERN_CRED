import express from 'express'
const router =express.Router();
import {adminpage,authAdmin,findAllusers,searchUser,deleteUser,editUser} from '../controller/adminController.js'


router.get('/admin',adminpage)
router.post('/adminlogin',authAdmin)
router.get('/findUsers',findAllusers)
router.post('/searchUser',searchUser)
router.delete('/deleteUser/:id',deleteUser)
router.put('/editUser/:id',editUser)




export default router;