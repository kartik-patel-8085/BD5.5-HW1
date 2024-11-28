let express = require('express');
let { book } = require('./models/book.model');
let { sequelize } = require('./lib/index');
let { user } = require('./models/user.model');
// let { like } = require('./models/like.model');

let app = express();
app.use(express.json());

let books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    summary: 'A novel about the serious issues of rape and racial inequality.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    summary:
      'A novel presenting a dystopian future under a totalitarian regime.',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    year: 1851,
    summary:
      'The narrative of the sailor Ishmael and the obsessive quest of Ahab.',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    summary:
      'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    summary: 'A novel about the American dream and the roaring twenties.',
  },
];

let users = [
  {
    username: 'booklover',
    email: 'booklover@gmail.com',
    password: 'password123',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
    await user.bulkCreate(users);

    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding database', error: error.message });
  }
});

// Exercise 1: Like a Book

async function likeBook(data) {
  let newLike = await like.create({ userId: data.userId, bookId: data.bookId });
  return { message: 'Book liked', newLike };
}
app.get('/users/:id/like', async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let bookId = parseInt(req.query.bookId);
    let result = await likeBook({ userId, bookId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
