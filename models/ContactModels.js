import mongoose from "mongoose";
import AddressSchema from "./AddressModel.js";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
    maxLength: [256, "Name cannot be more than 256 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phoneNo: {
    type: String,
    required: [true, "Please enter a phone number"],
    unique: true,
    trim: true,
  },
  address: AddressSchema,
  image: {
    type: String,
    required: [true, "Please upload an image"],
  },
});

export default mongoose.model(
  "Contact Schema",
  ContactSchema,
  "Contact Schema"
);
