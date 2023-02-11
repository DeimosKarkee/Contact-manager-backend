import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Please enter a street"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter a city"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "Please enter a state"],
    trim: true,
  },
  zipCode: {
    type: String,
    required: [true, "Please enter zipcode"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please enter a country"],
    trim: true,
  },
});
export default AddressSchema;
