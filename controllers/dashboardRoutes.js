const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Get route to go to create new post page
router.get('/create/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the id
   
    res.render('post', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Post route to create new blog post
router.post('/create', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get route to go to edit
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the id
   
    res.render('editpost', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Put route to edit blog post
router.put('/editpost/{{id}}', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      ...req.body,
        user_id: req.session.user_id,
      });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;