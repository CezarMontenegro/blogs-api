const checkToken = async (token) => {
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  if (!decoded) return false;
  const { email, password } = decoded;
  if (!email || !password) {
      return false;
  }
  return User.findAll({ where: {
      email,
      password,
  } });
};

const tokenCheck = async (authorization) => {
  if (!authorization) throwError(ERR_TOKEN_REQUIRED, 401);
  const arr = await auth.checkToken(authorization);
  if (arr === false || arr.length === 0) throwError(ERR_TOKEN_INVALID, 401);
  return arr[0].dataValues;
};

const get = async (authorization) => {
  await tokenCheck(authorization);
  return User.findAll();
};

const get = async (req, res, _next) => {
  const { authorization } = req.headers;
  const result = await service.get(authorization);
  return res.status(200).json(result);
};