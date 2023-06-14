import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// GET
router.get("/find/:id", getHotel);
router.get("/room/:id", getHotelRooms);

// GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
