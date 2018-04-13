const User=require('../models/user')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.users_post_signup = (req, res, next) => {

    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log("User Found:", user);
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User already exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(403).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then(result => {
                            console.log("Result", result)
                            res.status(200).json({
                                message: "User Created"
                            })
                        })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    };//else ending
                });
            }
        })


}

exports.users_delete = (req, res, next) => {
    const id = req.params.userId
    User.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "User deleted"
        })
    })
}

exports.users_post_login = (req, res, next) => {
    
     User.findOne({ email: req.body.email }).exec().then(result => {//here result is array of Users
        if (!result) {
            return res.json({
                success:false,
                message: "Auth Failed"
            })
        }
        else {
            bcrypt.compare(req.body.password, result.password, (err, resu) => {
                if (err) {
                    return res.json({
                        success:false,
                        message: "Auth Failed"
                    });
                }
                if (resu) {
                    const token = jwt.sign({
                        email: result.email,
                        _id: result._id//payload
                    },
                        'secret',
                        {
                            expiresIn: '1h'
                        });
                    return res.status(200).json({
                        success:true,
                        message: "Auth Successful",
                        token: token
                    })
                }
                res.json({
                    success:false,
                    message: "Auth Fail"
                });
            })
        }
    }) 
}