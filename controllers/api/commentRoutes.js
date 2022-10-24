const router = require('express').Router();
const { Comment } =require('/models');
const withAuth = require('/utils/auth');


  //Get all comments
  router.get('/', async (req, res) => {
    try {
      const comment = await comment.findAll();
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //create new comment
  router.post('/', async (req, res) => {
    try {
      const comment = await comment.create(
        req.body,
        {
          where: {
            user_id: req.params.user_id,
          },
        });
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    };
  });
  

  //delete comment
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const comment = await comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!comment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
  