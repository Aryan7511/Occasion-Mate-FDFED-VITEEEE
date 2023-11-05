import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    firstName: {
      type: String,
      lowercase: true,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true,
      min: 2,
      max: 50,
    },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//before saving a new document i wanna run this function
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //  Salting passwords enhances security by ensuring that identical passwords will have different hashes due to the unique salt.
    try {
      const saltRounds = 12; // Recommended value for salt rounds
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

//later we fetch the userId from this token and we can fetch the user data from the userId
UserSchema.methods.generateJWT = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const User = model("User", UserSchema);
export default User;
