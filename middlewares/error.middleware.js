const constants = require("../constants")

// captura qualquer erro passado usando next(err) ou lançado em rotas async

const errorHandler = (err, _, res, __) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)

  const responseObject = {
    message: err.message,
  }

  if (process.env.NODE_ENV === "development") {
    responseObject.stackTrace = err.stack ?? ""
    responseObject.name = err.name
  }

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      responseObject.title = "Validation Error"
      break
    case constants.NOT_FOUND:
      responseObject.title = "Not Found"
      break
    case constants.UNAUTHORIZED:
      responseObject.title = "Unauthorized"
      break
    case constants.FORBIDDEN:
      responseObject.title = "Forbidden"
      break
    case constants.SERVER_ERROR:
      responseObject.title = "Internal server error"
      break
    default:
      responseObject.title = "Unexpected error"
      break
  }

  res.json(responseObject)
}

module.exports = errorHandler
