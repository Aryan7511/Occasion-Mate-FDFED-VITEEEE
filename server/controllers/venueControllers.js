import Venueowner from "../models/Venueowner.js";

const registerVenueOwner = async (req, res, next) => {
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
    let venueOwner = await Venueowner.findOne({ email });
    if (venueOwner) {
      throw new Error("Venue Owner have already registered");
    }
    // creating a new vendor
    venueOwner = await Venueowner.create({
      firstName,
      lastName,
      email,
      password,
      businessName,
      businessAddress,
      phoneNumber,
    });

    return res.status(201).json({
      _id: venueOwner._id,
      avatar: venueOwner.avatar,
      firstName: venueOwner.firstName,
      lastName: venueOwner.lastName,
      email: venueOwner.email,
      businessName: venueOwner.businessName,
      businessAddress: venueOwner.businessAddress,
      phoneNumber: venueOwner.phoneNumber,
      token: await venueOwner.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginVenueOwner = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let venueOwner = await Venueowner.findOne({ email: email });

    if (!venueOwner) {
      throw new Error("Email not found");
    }

    const isMatch = await venueOwner.comparePassword(password);
    if (isMatch) {
      return res.status(201).json({
        _id: venueOwner._id,
        avatar: venueOwner.avatar,
        firstName: venueOwner.firstName,
        lastName: venueOwner.lastName,
        email: venueOwner.email,
        businessName: venueOwner.businessName,
        businessAddress: venueOwner.businessAddress,
        phoneNumber: venueOwner.phoneNumber,
        token: await venueOwner.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export { registerVenueOwner, loginVenueOwner };
