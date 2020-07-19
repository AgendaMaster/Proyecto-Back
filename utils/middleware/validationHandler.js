const boom = require('@hapi/boom');

function validate(data, schema) {
  const { error } = schema.validate(data, schema);
  return error;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error.details[0].message)) : next();
  };
}

module.exports = validationHandler;
