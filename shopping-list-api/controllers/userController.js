const bcrypt = require("bcrypt");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { userSchema, authSchema } = require("../validation/validate");

const addUser = async (req, res) => {
  try {
    // console.log(req.headers);
    const valid = await userSchema.validateAsync(req.body);
    const registered = await User.findOne({ email: valid.email });
    if (registered) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(valid.password, 10);
    const user = new User({
      name: valid.name,
      email: valid.email,
      password: hashedPassword,
    });
    const result = await user.save();
    let userObj = createUser(result);
    const token = generateToken(userObj);
    res.json(token);
  } catch (error) {
    if (error.isJoi) {
      const msg = error["details"][0].message;
      const obj = { message: msg };
      return res.status(422).json(obj);
    }
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // console.log(req.headers);
    const valid = await authSchema.validateAsync(req.body);
    const registered = await User.findOne({ email: valid.email });
    if (registered) {
      if (await bcrypt.compare(valid.password, registered.password)) {
        const user = createUser(registered);
        return res.json(generateToken(user));
      } else {
        return res
          .sendStatus(403)
          .json({ message: "Invalid username and password" });
      }
    } else {
      return res
        .sendStatus(403)
        .json({ message: "Invalid username and password" });
    }
  } catch (error) {
    if (error.isJoi) {
      const msg = error["details"][0].message;
      const obj = { message: msg };
      return res.status(422).json(obj);
    }
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
function createUser(fullUser) {
  let user = {
    name: fullUser.name,
    email: fullUser.email,
    _id: fullUser._id,
  };
  return user;
}

function generateToken(user) {
  let obj = {};
  obj.token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  let date = new Date();
  date.setDate(date.getDate() + 1);
  obj.expiresIn = date.getTime();
  return obj;
}
exports.addUser = addUser;
exports.loginUser = loginUser;
