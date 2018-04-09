const express=require('express')
const jwt=require('jsonwebtoken')
const morgan=require('morgan')//Package  for log 
const bodyparser=require('body-parser')
var mongoose=require('mongoose')

const app=express()

const productRoutes=require('./api/routes/products')
const orderRoutes=require('./api/routes/order')
const userRoutes=require('./api/routes/user')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//Logging Package
app.use(morgan('dev'))

mongoose.connect("mongodb://localhost:27017/mydb"
)
//this makes Uploads folder public so that it can be access from url
app.use(('/uploads'),express.static('uploads'))


 app.use('/products',productRoutes)
 app.use('/orders',orderRoutes)
 app.use('/users',userRoutes)


 
 /* app.use((req,res,next)=>{
  res.status(200).json({
      message:'Getinvds'
  })  
}) */
/*
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.json(403);
        }else{
            res.json({
                message:'Post created...',
                authData:authData
            });
        }
    });
});

app.post('/api/login',(req,res)=>{
    //Mock Users
    const user={
        id:1,
        username:'brad',
        email:'bradman@gmail.com'
    }

    jwt.sign({user:user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token:token
        });
    });
})
//Format of Token
//Authorization=Bearer <<access token>>
//VerifyToekn
function verifyToken(req,res,next){
    //get the auth header
    const bearerHeader=req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader!='undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1]
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
app.listen(5000,()=>console.log('server started in 5000')) */

//Mechanism that uses additional HTTP headers to let a user gain permission 
//to access resources fromaserver on a different origin(domain) than the site currently in use
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,PATCH,DELETE,GET,POST');
        return res.status(200).json({});
    }
})

app.use((req,res,next)=>{
    const error=new Error('Not FOund ')
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})


module.exports = app