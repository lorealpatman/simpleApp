const responses = require("../models/responses");
const usersService = require("../services/users.service");
const apiPrefix = "/api/people";

module.exports = {
  getAll: getAll,
  // getUserById: getUserById,
  post: post,
  put: put,
  delete: _delete
};

function getAll(req, res) {
  usersService
    .getAll()
    .then(users => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = people;
      res.json(responseModel); // 200 Response
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function post(req, res) {
  req.body.createdDate = new Date();
  req.body.modifiedDate = new Date();
  usersService
    .post(req.body)
    .then(id => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = id;
      res
        .status(201)
        .location(`${apiPrefix}/${id}`)
        .json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}