const express = require('express');
const router = require('express').Router();


//@route GET api/profile/test
//@desc  Tests profile route
//@access Profil e
router.get('/test', (req, res) => res.json({ msg: "Profile works" }));
module.exports = router;