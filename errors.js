exports.handleNotFoundError = (req, res, err) => {
  if (err) {
    res.status(404).send({ msg: "Not Found" });
  }
};
  
exports.handleServerErrors = (err, req, res, next) => {
  console.log(err)
  if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
  } else {
      res.status(500).send({ msg: 'Internal Server Error' });
  }
};