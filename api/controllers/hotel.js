//** Hotel Controller */

import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//** Create Hotel */
export const createHotel = async (req, res, next) => {
  //** create new model hotel from body req */
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//** Get Hotel */
export const getHotel = async (req, res, next) => {
  try {
    //** get hotel by id req params */
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//** Get Hotels and parsing query by terms */
export const getHotels = async (req, res, next) => {
  //** get query parameter */
  const { min, max, ...others } = req.query;
  try {
    //** find hotel by terms and condition */
    const hotels = await Hotel.find({
      ...others,

      //** in this case is cheapestPrice property */
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },

      //** limit query parameter in this case hotels model */
    }).limit(req.query.limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

//** count hotels by city property */
export const countByCity = async (req, res, next) => {
  //** assign params to array element */
  const cities = req.query.cities.split(",");

  try {
    //** get list of hotels by terms */
    const list = await Promise.all(
      //** iterated the city property of hotels model */
      cities.map((city) => {
        //** count the model hotels which is having city property */
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};


//** count hotels by property type */
export const countByType = async (req, res, next) => {
  try {

    //** get property type hotels model */
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    //** response all the property type */
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

//** update hotel */
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//** Delete hotel */
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    next(error);
  }
};

//** get Hotel Rooms */
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms?.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
