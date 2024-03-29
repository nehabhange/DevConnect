const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
    Profile.findOne({ user: req.user.id })
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
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

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
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');

    }

    //social 
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
        //update
        if (profile) {
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile))
        } else {
            //create

            //check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                    errors.handle = "The handle already exists";
                    return res.status(400).json(errors);
                }
                //save profile
                new Profile(profileFields).save().then(profile => res.json(profile));

            })
        }
    })
});

//@route POST api/profile/experience
//@desc  Add experience to your profile
//@access Private

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Profile.findOne({ user: req.user.id }).then(profile => {
            const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description

                }
                //add to experience array
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile))

        })
    })
    //@route POST api/profile/education
    //@desc  Add experience to your profile
    //@access Private

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
        const newEdu = {
                school: req.body.school,
                company: req.body.company,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description

            }
            //add to experience array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile))

    })
})

//@route DELETE api/profile/experience/:exp_id
//@desc  Delete experience to your profile
//@access Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id }).then(profile => {
            //get remove by index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id)
                //splice out of array
            profile.experience.splice(removeIndex, 1)
            profile.save().then(profile => res.json(profile))

        })
        .catch(err => res.status(404).json(err))
})

//@route DELETE api/profile/education/:exp_id
//@desc  Delete education to your profile
//@access Private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id }).then(profile => {
            //get remove by index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.exp_id)
                //splice out of array
            profile.education.splice(removeIndex, 1)
            profile.save().then(profile => res.json(profile))

        })
        .catch(err => res.status(404).json(err))
});

//@route DELETE api/profile
//@desc  Delete user profile
//@access Private

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
            res.json({ success: true })

        })

    })

})

module.exports = router;