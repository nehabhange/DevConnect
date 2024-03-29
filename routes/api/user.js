const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/key");
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load user model
const User = require("../../models/User");
//@route GET api/user/test
//@desc  Tests user route
//@access user
router.get("/test", (req, res) => res.json({ msg: "User works" }));

//@route POST api/user/register
//@desc  Register user
//@access Public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200", //size
                r: "pg", //rating
                d: "mm", //default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => console.log(err));
                    }
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
   
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
        }
        //check password
        else {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    //user matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload
                    jwt.sign(
                        payload,
                        key.secretOrKey, { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                sucess: true,
                                token: 'Bearer ' + token
                            })

                        });
                } else {
                    errors.password = "Password is incorrect"
                    return res.status(404).json(errors);
                }
            });
        }
    });
});


router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })

    })

module.exports = router;