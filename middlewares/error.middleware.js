const constants = require("../constants")

const errorHandler = (err, _, res, __) => {
  const statusCode = res.status ?? 500
  const responseObject = { message: err.message }

  if (process.env.NODE_ENV === "development") {
    responseObject.stackTrace = err.stack ?? ""
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
      break
  }

  res.json(responseObject)
}

module.exports = errorHandler
