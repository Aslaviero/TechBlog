const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
//User has multiple posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//User has multiple comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Posts that belong to User
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//Comments that belong to User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

//Comments that belond to Post
Comment.belongsTo(Post, {
  foreignKey: 'user_id'
});

//Post with multiple comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
