import jwt from 'jsonwebtoken'

const generateToken = (res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'20d'
    })


res.cookie('jwt',token,{
    httpOnly:true,//to prevent client side js to access the cookie and use it as 
    secure:process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge:30 * 24 * 60 * 60 * 1000
})

}

export default generateToken;