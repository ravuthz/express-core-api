const debug = require('debug')('express-core-api:crud');

const express = require("express");

module.exports = (model) => {
  
  const repository = require("./repository")(model);

  const handleError = (res, error) => {
    const status = 500;
    res.status(500).send(error);
    // res.status(status).json({
    //   status,
    //   errors: error,
    //   data: null
    // });
    debug(error);
  };

  const handleResult = (res, data = {}) => {
    const status = 200;
    res.status(status).send(data);
    // res.status(status).json({
    //   status,
    //   errors: null,
    //   data
    // });
  };

  const readList = (req, res) => {
    let query = res.locals.query || {};
    repository.findAll(query)
      .then((data) => handleResult(res, data))
      .catch((error) => handleError(res, error));
  };

  const readOne = (req, res) => {
    const {_id} = req.params;
    repository.findById(_id)
      .then((data) => handleResult(res, data))
      .catch((error) => handleError(res, error));
  };

  const create = (req, res) => {
    repository.save(req.body, null)
      .then(() => handleResult(res))
      .catch((error) => handleError(res, error));
  };

  const update = (req, res) => {
    repository.save(req.body, req.params._id)
      .then(() => handleResult(res))
      .catch((error) => handleError(res, error));
  };

  const remove = (req, res) => {
    repository.deleteById(req.params._id)
      .then(() => handleResult(res))
      .catch((error) => handleError(res, error));
  };

  let router = express.Router();

  router.post("/", create);
  router.get("/", readList);
  router.get("/:_id", readOne);
  router.put("/:_id", update);
  router.delete("/:_id", remove);

  return router;
};
