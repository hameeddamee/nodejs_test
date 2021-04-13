const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const User = require("./user.model");
const userError = require("./user.error");

const config = require("../../config");

const logger = require("../../library/helpers/loggerHelpers");
const jwtHelpers = require("../../library/helpers/jwtHelpers");
const { isEmpty } = require("../../library/helpers/validationHelpers");

exports.checkUserExist = async (query) => {
  const user = await findUser({ ...query });

  if (!user) {
    return false;
  }

  return true;
};

exports.signUp = async ({ formattedfullNames, email, password }) => {
  let avatar = await gravatar.url(email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm", // Default
  });

  // Save the user
  let userObj = {
    name: formattedfullNames,
    email,
    avatar: avatar,
    enable: true,
    password,
  };

  const user = new User(userObj);
  await user.save();

  let token = jwtHelpers.encode({ email });
  logger.info(`Auth token created: ${token}`);

  return {
    token: `${config.tokenType} ${token}`,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    enable: user.enable,
  };
};

exports.authenticate = async (email, password) => {
  const user = await User.findOne({ email }).populate("todo");

  if (!user) {
    logger.warn("Authentication failed. Wrong credential.");
    throw userError.WrongCredential();
  }
  if (!user.enable) {
    logger.warn("User account not activated");
    throw userError.Unactivated();
  }
  const isValidPassword = await bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    logger.warn("Authentication failed. Wrong credential.");
    throw userError.WrongCredential();
  }

  let token = jwtHelpers.encode({ email });
  logger.info(`Auth token created: ${token}`);

  return {
    token: `${config.tokenType} ${token}`,
    user: {
      name: user.name,
      avatar: user.avatar,
      enable: user.enable,
      email: user.email,
      todos: user.todos,
    },
  };
};

exports.findUserByEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    logger.warn("Authentication failed. User not found.");
    throw userError.UserNotFound("Authentication failed. User not found.");
  }

  return user;
};

const findUser = async (query = {}, selectQuery = "", findMode = "one") => {
  const user = await User.find(query).select(selectQuery).exec();
  if (findMode === "one") {
    return user[0];
  }
  return user;
};

exports.findById = async (id) => {
  const user = await User.findById(id);
  return user;
};
