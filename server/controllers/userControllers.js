import User from "../models/User.js";

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, password } = req.body;
    const email = req.body.email.toLowerCase();
    // check whether the user exists or not
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User have already registered");
    }
    // creating a new user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new Error("Email not found");
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
