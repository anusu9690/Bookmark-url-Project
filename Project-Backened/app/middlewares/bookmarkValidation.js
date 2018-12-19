const { ObjectID } = require("mongodb");
//express middleware

const validateId = (req, res, next) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.send({
      notice: "invalid object id"
    });
  } else {
    next();
  }
};

module.exports = {
  validateId
};
