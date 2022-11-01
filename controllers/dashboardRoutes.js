const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Create a new post
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

// Edit post
router.put('/editpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findbyPk(
      req.params.id, {
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'content', 'user_id']
          }
        ]
      });
       
    const post = postData.get({ plain: true });
    
    res.render('dashboard', {
        post,
        logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;