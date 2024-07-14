const express = require('express');
const router = express.Router();
const bookMulter = require('../middleware/book');
const database = require('../db/index');
const mainUrl = process.env.MAIN_URL || '/api/books';
const Book = require('../classes/Book');

router.get('/book', (req, res) => {
  const { books } = database;
  res.render('book/index', {
    title: "Библиотека",
    books: books
  })
});

router.get('/book/view/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    res.render('book/view', {
      title: "Библиотека",
      book: books[idx]
    })
  }
});

router.get('/book/create', (req, res) => {
  res.render('book/create', {
    title: "Библиотека",
    book: {}
  })
});

router.post('/book/create', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res.redirect('/api/books/book');
});

router.get('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    res.render('book/update', {
      title: 'Библиотека',
      book: books[idx]
    })
  }
})

router.post('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
      };

    res.redirect('/api/books/book/view/' + id);
  }
})

router.post('/book/delete/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    books.splice(idx, 1);
    res.redirect('/api/books/book');
  }
})


/*
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
*/
module.exports = router;


/*
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
*/