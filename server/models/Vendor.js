import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const VendorSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    firstName: { type: String, required: true,lowercase: true, min: 2, max: 50 },
    lastName: { type: String, required: true,lowercase: true, min: 2, max: 50 },
    email: { type: String, required: true,lowercase: true, unique: true },
    businessName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//before saving a new document i wanna run this function
VendorSchema.pre("save", async function (next) {
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
  VendorSchema.methods.generateJWT = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  
  VendorSchema.methods.comparePassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  };



const Vendor = model("Vendor", VendorSchema);
export default Vendor;
