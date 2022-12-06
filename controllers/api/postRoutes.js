const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// Get post from a certain id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      include: [
        {
          model: user,
          attributes: ['username']
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found for this id!' });
      return;
    }
   
   const posts = postData.map((post) => post.get({ plain: true }));

   console.log(posts)
   res.render('editpost', { 
     posts, 
     logged_in: req.session.logged_in 
   });
 } catch (err) {
   res.status(500).json(err);
 }
});


//Edit a post
router.put('/editpost/:id', withAuth, async (req, res) => {
    const editPost = await Post.update({
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'user_id']
        },
      ],
      });

  const posts = editPost.map((post) => post.get({ plain: true }));

  console.log(posts)
  res.render('editpost', { 
    posts, 
    logged_in: req.session.logged_in 
  });
    res.status(500).json(err);
});

// // TODO: delete post
// router.delete('/delete/id', withAuth, async (req, res) => {
  
// });
module.exports = router;
