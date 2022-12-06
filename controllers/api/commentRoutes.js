const router = require('express').Router();
const { Comment, Post } =require('../../models');
const withAuth = require('../../utils/auth');

  router.get('/comment/:id', async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'date_created', 'content', 'user_id' ],
        include: [
          {
            model: Post,
            attributes: ['id', 'post_id']
          },
        ],
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
  //create new comment
  router.post('/comment/:id', async (req, res) => {
    try {
      const Comment = await Comment.create({
        ...req.body,
            user_id: req.params.user_id,
          
        });
      res.status(200).json(Comment);
    } catch (err) {
      res.status(500).json(err);
    };
  });
  

  // //TODO: delete comment 
  // router.delete(':id', withAuth, async (req, res) => {
  //   try {
     
  //   }
  // });

  module.exports = router;
  