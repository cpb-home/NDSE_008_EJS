const express = require('express');
const router = express.Router();
const database = require('../db/index');
const Book = require('../classes/Book');

router.get('/', (req, res) => {
  const { books } = database;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const { books } = database;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
});

router.post('/', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.post('/login', (req, res) => {
  const { users } = database;

  if (users[0]) {
    res.json(users[0]);  
  } else {
    res.status(404);
    res.json('404: not found any users');
  }
});

router.put('/:id', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    books[idx] = {
      id: books[idx].id,
      title: title ? title : books[idx].title,
      description: description ? description : books[idx].description,
      authors: authors ? authors : books[idx].authors,
      favorite: favorite ? favorite : books[idx].favorite,
      fileCover: fileCover ? fileCover : books[idx].fileCover,
      fileName: fileName ? fileName : books[idx].fileName,
      fileBook: fileBook ? fileBook : books[idx].fileBook,
    };
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
});

router.delete('/:id', (req, res) => {
  const { books } = database;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
});

module.exports = router;