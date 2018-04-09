const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ");
        console.log("token",token[1])
        const decoded=jwt.verify(token[1],"secret")
        req.userData=decoded
        next()

    }catch(error){
        res.status(401).json({
            message:"Auth failed"
        })
    }
}