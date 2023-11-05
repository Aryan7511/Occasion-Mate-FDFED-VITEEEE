import Vendor from "../models/Vendor.js";

const registerVendor = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      businessName,
      businessAddress,
      phoneNumber,
    } = req.body;
    // check whether the vendor exists or not
    let vendor = await Vendor.findOne({ email });
    if (vendor) {
      throw new Error("Vendor have already registered");
    }
    // creating a new vendor
    vendor = await Vendor.create({
      firstName,
      lastName,
      email,
      password,
      businessName,
      businessAddress,
      phoneNumber,
    });

    return res.status(201).json({
      _id: vendor._id,
      avatar: vendor.avatar,
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      email: vendor.email,
      businessName: vendor.businessName,
      businessAddress: vendor.businessAddress,
      phoneNumber: vendor.phoneNumber,
      token: await vendor.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let vendor = await Vendor.findOne({ email: email });

    if (!vendor) {
      throw new Error("Email not found");
    }

    const isMatch = await vendor.comparePassword(password);
    if (isMatch) {
      return res.status(201).json({
        _id: vendor._id,
        avatar: vendor.avatar,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        email: vendor.email,
        businessName: vendor.businessName,
        businessAddress: vendor.businessAddress,
        phoneNumber: vendor.phoneNumber,
        token: await vendor.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export { registerVendor, loginVendor };
