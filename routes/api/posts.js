const express = require('express');
const router = require('express').Router();

//@route GET api/posts/test
//@desc  Tests posts route
//@access Profile
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));
module.exports = router;