const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validatePostsInput = require('../../validation/posts');

//load Posts model
const Post = require('../../models/Posts');

//@route GET api/posts/test
//@desc  Tests posts route
//@access Public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

//@route POST api/posts
//@desc  Create  posts route
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostsInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post))
});
//@route GET api/posts
//@desc  fetch posts
//@access Public

router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(post => res.json(post))
        .catch(err => res.status(400))
});

//@route GET api/posts/:id
//@desc  fetch posts by id
//@access Public

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)

    .then(post => res.json(post))
        .catch(err => res.status(400).json({ nopostfound: "No post found with that ID " }))
})

//@route DELETE api/posts/:id
//@desc  Delete post
//@access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
                //check for post owner
                if (post.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorizeduser: "Not authorized user" })
                }
                //delete posts
                post.remove().then(() => res.json({ success: true }));

            })
            .catch(err => res.status(404).json({ nopostfound: "No post found with this user" }))
    })
})

//@route POST api/posts/like/:id
//@desc  Like posts
//@access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
                if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({ alreadyliked: "Already Liked" })
                }
                //add user id to likes array
                post.likes.unshift({ user: req.user.id });
                //save user id
                post.save().then(post => res.json(post))


            })
            .catch(err => res.status(404).json({ nopostfound: "No post found with this user" }))

    })
});

//@route POST api/posts/unlike/:id
//@desc  unLike posts
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
                if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(400).json({ notliked: "Not yet liked the post" })
                }
                //unlike by getting remove index
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id)

                //splice out of the array
                post.likes.splice(removeIndex, 1)

                //save user id
                post.save().then(post => res.json(post))


            })
            .catch(err => res.status(404).json({ nopostfound: "No post found with this user" }))

    })
});

//@route POST api/posts/comment/:id
//@desc  Comment posts
//@access Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostsInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then(post => {
            const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                }
                //add comment to comment array
            post.comments.unshift(newComment);
            //save the post
            post.save().then(post => res.json(post))


        })
        .catch(err => res.status(404).json({ nopostfound: "No post found with this user" }))

});
//@route DELETE api/posts/comment/:id/:comment_id
//@desc  Delete posts
//@access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id).then(post => {
            //check if the comment exists or not
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexist: "Comment does not exist" })
            }
            //get removeIndex
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id)
            post.comments.splice(removeIndex, 1)
                //save the post
            post.save().then(post => res.json(post))


        })
        .catch(err => res.status(404).json({ nopostfound: "No post found with this user" }))

})


module.exports = router;