const getToken = (req) => {
  //req.headers contains the token
  //.split splits authorization property of req.headers obj into an array with each part in an index
  const token = req.headers.authorization.split(" ")[1];

  if (token !== undefined) {
    return token;
  } else {
    return {
      status: "failed",
      message: "Token not available",
    };
  }
};

module.exports = getToken;
