//** Rooms Controller */

import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//** Create Room */
export const createRoom = async (req, res, next) => {
  //** get hotel id params */
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    //** save room */
    const savedRoom = await newRoom.save();

    try {
      //** passing hotel id to get rooms id  */
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//** Update Room */
export const updateRoom = async (req, res, next) => {
  try {
    //** passing id hotels used to provide new data to be updated. */
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,

      //** used to updated property in this case is body */
      { $set: req.body },

      //** used terms to update new property */
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//** update room availability property */
export const updateRoomAvailability = async (req, res, next) => {
  try {
    //** passing id as param to updated availability property */
    await Room.updateOne(
      //** set the room id with req.params.id in the roomNumbers array */
      { "roomNumbers._id": req.params.id },
      {
        //** get availability property and set to new value in this case is dates */
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

//** Delete Room */
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      //** used to updated property in this case is rooms property by id params */
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
