import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
} from "../controllers/contactControllers.js";

const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContactById);

export default router;
