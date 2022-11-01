const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Get route to main homepage
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    console.log(posts)
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get route to post by userid
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get route to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
        
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })

    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Get route to create post page
router.get('/dashboard/create', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
   
    res.render('post', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Get route to edit post page
router.get('/dashboard/editpost/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
   
    res.render('editpost', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Get route to edit post page
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
   
    res.render('comment', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Get Route to Login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//Get Route to Signup
router.get('/signup', (res, req) => {
  if  (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
