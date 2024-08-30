import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
   console.log(req)
   const token = req.headers["authorization"];
   if (!token) return res.status(401).send("empty token");

   try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
   } catch (e) {
      res.status(500).send(e.message);
   }
};