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
  const contactId = await ContactModels.findById(req.params.id);
  if (!contactId) {
    return next(
      new ErrorResponse(`Contact not foud with the id of ${req.params.id}`)
    );
  }
  res.json({ success: true, data: contactId });
});

export const createContact = asyncHandler(async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
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

export const updateContact = asyncHandler(async (req, res, next) => {
  const contactId = await ContactModels.findById(req.params.id);
  if (!contactId) {
    return next(
      new ErrorResponse(`Contact not foud with the id of ${req.params.id}`)
    );
  }

  // find file path of image and delete
  const filePath = path.join(__dirname, "..", contactId.image);
  fs.unlink(filePath, (err) => {
    if (err) {
      return next(
        new ErrorResponse(`Could not delete image at ${filePath}`, 500)
      );
    }
  });

  // Upload updated contact
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Could not upload image: ${err}`, 500));
    }

    const newContact = await ContactModels.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file.path },
      { runValidators: true, new: true }
    );
    res.json({ success: true, data: newContact });
  });
});

export const deleteContact = asyncHandler(async (req, res, next) => {
  const contactId = await ContactModels.findById(req.params.id);
  if (!contactId) {
    return next(
      new ErrorResponse(`Contact not foud with the id of ${req.params.id}`)
    );
  }

  const filePath = path.join(__dirname, "..", contactId.image);
  fs.unlink(filePath, (err) => {
    if (err) {
      return next(
        new ErrorResponse(`Could not delete image at ${filePath}`, 500)
      );
    }
  });

  await ContactModels.findByIdAndRemove(req.params.id);
  res.send({
    success: true,
    response: `Successfully deleted contact with the id of ${req.params.id}`,
  });
});
