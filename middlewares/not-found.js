const notFound = (req, res) => {
  res.status(404).render('unknown');
};

module.exports = notFound;
