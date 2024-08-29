import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/jwt";

export const signup = async (req, res) => {
   const { username, email, password } = req.body;
   try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) return res.status(409).send("User Exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         username: username,
         email: email,
         password: hashedPassword,
      });
      await newUser.save();
      res.send("registration successful");
   } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
   }
};
export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).send("Invalid Email or Password");
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
         return res.status(400).send("Invalid Email or Password");

      const token = generateAuthToken(user);
      res.status(200).send(token);
   } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
   }
};
