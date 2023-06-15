// ** Auth Controller */

import User from "../models/User.js";
import { createError } from "../utils/error.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ** Register Controller */
export const register = async (req, res, next) => {
  try {
    // ** hashing password process. */
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // ** create new user model and changing password value */
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // ** saving new user model */
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    next(error);
  }
};

// ** Login Auth Controller */
export const login = async (req, res, next) => {
  try {
    // ** Auth Process */

    // ** get username model property */
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // ** bcrypt used for compare user password hash model */
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // ** generate access login token using jwt */
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // ** removing password and isAdmin model property */
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      // ** response model property details and isAdmin  */
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
