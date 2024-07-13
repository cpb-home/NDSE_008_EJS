module.exports = (req, res) => {
  res.status(404);
  res.json('Ошиюка 404. Страница по такому адресу не найдена.')
}