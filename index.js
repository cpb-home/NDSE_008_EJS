const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const mainUrl = process.env.MAIN_URL || '/api/books';

const error404 = require('./middleware/404');
const indexRouter = require('./routes/index');
const bookFileRouter = require('./routes/bookFile');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(mainUrl+'/public', express.static(__dirname+'/public/books'));

app.use(mainUrl, indexRouter);
app.use(mainUrl, bookFileRouter);
app.use(error404);

app.listen(PORT);