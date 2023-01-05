const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Get route to main homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
   
      model: Post,
      attributes: ['id', 'title', 'date_created', 'content', 'user_id' ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Get route to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on ID
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

//Get route to posting a comment on a post
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the id
   
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
