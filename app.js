
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

mongoose.connect("mongodb://localhost:27017/mydb")


//this makes Uploads folder public so that it can be access from url
//Should be above Routes
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(('/uploads'),express.static('uploads'))

 app.use('/products',productRoutes)
 app.use('/orders',orderRoutes)
 app.use('/users',userRoutes)

 //CORS error ko lagi

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