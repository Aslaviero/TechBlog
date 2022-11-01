const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');



//Get post from a certain id(user)
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a post
router.put('/editpost/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(
      ...req.body,
      {
        where: {
          id: req.params.id,
          title: req.params.title,
          content: req.params.content,
        },
      });
      res.status(200).json(post);
  } catch(err) {
    res.status(500).json(err);
  };
});

//delete post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'There is no post with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
