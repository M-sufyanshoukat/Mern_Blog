import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

import Validator from "email-validator";
import admin from "firebase-admin";
import expressAsyncHandler from "express-async-handler";

import { sendPasswordResetEmail } from "../helper/sendEmailReset.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(password)) {
    return next(
      errorHandler(400, "Password must contain at least one special character")
    );
  }

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      next(
        errorHandler(400, "Email is already exists Please Choose a new one")
      );
    }

    const validEmail = Validator.validate(email);

    if (!validEmail) {
      next(errorHandler(400, "Please Enter a Valid Email"));
    }

    const UserName = await User.findOne({ username });
    if (UserName) {
      next(errorHandler(400, "This Username  already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid password or Email"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password or Email"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyCvkjDfkx4G9MYMesSAsBsrKI72XIFq_48",
  authDomain: "mernbog.firebaseapp.com",
  projectId: "mernbog",
  storageBucket: "mernbog.appspot.com",
  messagingSenderId: "607976703514",
  appId: "1:607976703514:web:a8c879eacbc2196b11b3a3",
  measurementId: "G-Q1DXV2W0CW",
};



const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const passwordResetRequest = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const newToken = genToken(user._id);
      sendPasswordResetEmail(newToken, user.email, user.username);
      return res.json({
        message: `We have sent you a recovery email to ${email}`,
      });
    }
    // If user not found, send appropriate error response
    return res
      .status(401)
      .json({ error: "There is no account with such an email address" });
  } catch (error) {
    // Handle other errors and send appropriate response
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const passwordReset = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { password } = req.body;

  // Regular expressions to check for at least one special character and one number
  const specialCharRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  const numberRegex = /[0-9]/;

  if (password.length < 8 ) {
    return res.status(400).json({ error: "Password must contain at least 8 characters" });
  }

  else if ( !specialCharRegex.test(password)){
    return res.status(400).json({ error: "Password must contain at least  one special character" });

  }

  else if (!numberRegex.test(password)) {
    return res.status(400).json({ error: "Password must contain at least  one number." });

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      const hashedPassword = await bcryptjs.hash(password, 10);

      user.password = hashedPassword;
      await user.save();

      return res.json({ message: "Your password has been updated successfully." });
    } else {
      return res.status(404).send("User not found.");
    }
  } catch (error) {
    return res.status(401).send("Password reset failed." + error.message);
  }
});

