let { DataTypes, sequelize } = require('../lib');
let user = require('./user.model');
let book = require('./book.model');

let like = sequelize.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: 'id',
    },
  },
});

user.belongsToMany(book, { through: like });

book.belongToMany(user, { through: like });

module.exports = { like };