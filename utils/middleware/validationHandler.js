const boom = require('@hapi/boom');

function validate(data, schema) {
  const response = schema.validate(data);
  return response;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const result = validate(req[check], schema);

    if (result.error) {
      next(boom.badRequest(result.error.details[0].message))
    }

    next()
  };
}

module.exports = validationHandler;
