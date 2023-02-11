import ContactModels from "../models/ContactModels.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

import fs from "fs";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage });

export const getAllContacts = asyncHandler(async (req, res, next) => {
  const allContacts = await ContactModels.find();
  res.json({
    success: true,
    totalContacts: allContacts.length,
    data: allContacts,
  });
});

export const getContactById = asyncHandler(async (req, res, next) => {
  const contactById = await ContactModels.findById(req.params.id);
  if (!contactById) {
    return next(
      new ErrorResponse(
        `Contact not found with the id of ${req.params.id}.`,
        400
      )
    );
  }
  res.json({ success: true, data: contactById });
});

export const createContact = asyncHandler(async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    console.log(req.body);
    console.log(JSON.stringify(req.file));
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file was sent" });
    }

    const { name, email, phoneNo, street, city, state, zipCode, country } =
      req.body;
    const image = req.file.path;

    const newContact = new ContactModels({
      name,
      email,
      phoneNo,
      street,
      city,
      state,
      zipCode,
      country,
      image,
    });

    const saveContact = await newContact.save();
    if (!saveContact) {
      res
        .status(400)
        .json({ success: false, error: "Failed to create new contact" });
      return;
    }

    res.json({ success: true, data: saveContact });
  });
});
