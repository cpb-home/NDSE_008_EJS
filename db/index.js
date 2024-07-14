const database = {
  books: [
    {
      title: 'Книга номер раз',
      description: 'Вообще ни о чём. Про книга, просто номер раз.',
      authors: 'Домашкин Домашк Домашкович',
      favorite: 'true',
      fileCover: 'Картинка',
      fileName: 'Название файла',
      fileBook: 'public\\books\\1720771268494-Screenshot_1.png',
      id: "1"
    },
    {
      title: 'Книга номер два',
      description: 'Такая же, как и первая, не лучше и не хуже. Читать не стоит.',
      authors: 'Домашкин Домашк Домашкович',
      favorite: '',
      fileCover: 'Картинка',
      fileName: 'Название файла',
      fileBook: 'public\\books\\1720771268494-Screenshot_1.png',
      id: "2"
    },
    {
      title: 'Книга номер три',
      description: 'В этой книге вообще муть. Даже пытаться открыть не стоит. Лучше сразу удалить!!!',
      authors: 'Домашкин Домашк Домашкович',
      favorite: 'true',
      fileCover: 'Картинка',
      fileName: 'Название файла',
      fileBook: 'public\\books\\1720771268494-Screenshot_1.png',
      id: "3"
    }
  ],
  users: [
    {
      id: 1,
      mail: "test@mail.ru"
    }
  ]
};

module.exports = database;