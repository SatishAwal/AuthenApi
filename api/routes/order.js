const express=require('express')
const router=express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Order Get request"
    })
})

router.post('/', (req, res, next) => {
    const orders = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Order Post request",
        orders
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order details request",
        orderId:req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order deleted ",
        orderId
    })
})

module.exports=router

