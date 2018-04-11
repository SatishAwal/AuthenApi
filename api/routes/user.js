const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const UserController=require('../controllers/users')
const User = require('../models/user')
const checkAuth = require("../middleware/chechAuth")

router.get('/',checkAuth,(req,res,next)=>{
    User.find().then(result=>{
        res.json({
            user:result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.post('/signup', UserController.users_post_signup) 

router.delete('/:userId',UserController.users_delete)

router.post('/login',UserController.users_post_login)

module.exports = router;