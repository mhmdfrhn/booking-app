// ** User Controller */

import User from "../models/User.js";

// ** Get User */
export const getUser = async (req, res, next) => {
  try {
    //** get user id */
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ** Get All User */
export const getUsers = async (req, res, next) => {
  try {
    //** get users */
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ** Update User */
export const updateUser = async (req, res, next) => {
  try {
    //** get user by id and update */
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// ** Delete User */
export const deleteUser = async (req, res, next) => {
  try {
    //** get user id and delete */
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
