const express = require('express');
const router = express.Router();

//@route GET api/user/test
//@desc  Tests user route
//@access user
router.get('/test', (req, res) => res.json({ msg: "User works" }));
module.exports = router;