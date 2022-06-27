const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load user model
const User = require('../../models/User');
const Profile = require('../../models/Profile');


//@route GET api/profile/test
//@desc  Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({ msg: "Profile works" }));

//@route GET api/profile
//@desc  user profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.body.id })
        .then((profile) => {
            if (!profile) {
                errors.noprofile = "There is no profile of this user";
                return res.status(404).json(errors);
            }
            return res.json(profile)
        })
        .catch((err) => res.status(400).json(err));
});

//@route POST api/profile/test
//@desc  Create user profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //split skills of array
    if (req.body.skills) profileFields.skills = req.body.skills;
    if (req.body.skills) profileFields.skills = req.body.skills;
    if (req.body.skills) profileFields.skills = req.body.skills;








})

module.exports = router;