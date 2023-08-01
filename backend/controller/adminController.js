
import asyncHandler  from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import userModel from '../models/userModel.js'


const adminpage = asyncHandler(async (req, res) => {

    res.json({ message: 'Success' });
})


const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const name='admin'

    try {
        if (email === 'nithin@gmail.com' && password === '123') {

            generateToken(res, email);

            res.status(201).json({ email,name });


        } else if (email === 'admin@gmail.com') {
            res.status(401).json({ message: 'Invalid password' });
        } else {
            res.status(401).json({ message: 'Invalid email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});



const findAllusers = asyncHandler(async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json( users )
    }
    catch (err) {
        res.status(500).json({ err })
    }

})


const searchUser = asyncHandler(async (req, res) => {
    const name = req.body.name
    try {
        const regex = new RegExp(name, 'i');
        const result = await userModel.find({ name: regex });
        res.status(200).json({ result })

    } catch (error) {
        res.status(500).json({ error })
    }

})




const deleteUser = async (req, res) => {
    const userId = req.params.id


    try {
        const deletedUser = await userModel.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};




const editUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            name: req.body.name,
            email: req.body.email
        }, { new: true })

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(200).json('user not found');
        }
    } catch (err) {
        res.status(500).json({ err })
    }
}

export {adminpage,authAdmin,findAllusers,searchUser,deleteUser,editUser}








