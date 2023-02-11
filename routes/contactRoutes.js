import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactControllers.js";

const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

export default router;
