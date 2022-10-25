const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


// Edit post
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findbyPk(
      req.params.id, {
        attributes: ['id', 'title', 'post_body'],
      });
       
    const post = postData.get({ plain: true });
    
    res.render('edit-post', {
        post,
        logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;