import User from "../models/userModels.js";
import bcrypt from "bcryptjs"
import { generateAuthToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
   const { username, email,preferredGenre, password } = req.body;
   try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) return res.status(409).send("User Exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
         username: username,
         email: email,
         preferredGenre:preferredGenre,
         password: hashedPassword,
      });
      const user=await newUser.save();
      const token = generateAuthToken(user);
      res.status(201).json({message:"registeration successful",token:token,preferredGenre:user.preferredGenre});
   } catch (err) {
      res.status(500).json({error:`Error: ${err.message}`});
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
      res.status(200).json({token:token,preferredGenre:user.preferredGenre});
   } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
   }
};
