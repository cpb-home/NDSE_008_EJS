const express = require('express');
const router = express.Router();
const bookMulter = require('../middleware/book');
const database = require('../db/index');
const mainUrl = process.env.MAIN_URL || '/api/books';

router.post('/upload/:id',
  bookMulter.single('file'),
  (req, res) => {
    if (req.file) {
      const { books } = database;
      const idx = books.findIndex(book => book.id === req.params.id);

      if (idx !== -1) {
        books[idx].fileBook = req.file.path;
        res.json(books[idx]);
      } else {
        res.status(404);
        res.json('404: not found such id');
      }
    } else {
      res.json('Файл не был загружен.');
    }
  }
);

router.get('/:id/download', (req, res) => {
  const { books } = database;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    const dirArr = __dirname.split('\\');
    dirArr.pop();
    const dir = dirArr.join('\\');
    console.log(`dir ${dir}`);
    res.download(dir+'\\'+books[idx].fileBook);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
});

module.exports = router;