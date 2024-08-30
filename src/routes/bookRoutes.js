import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
   addBook,
   getUserBooks,
   updateBookStatus,
   deleteBooks,
} from "../controllers/bookController.js";
const router = Router();

router.get("/", auth, getUserBooks);
router.post("/",auth,  addBook);
router.patch("/",auth,  updateBookStatus);
router.delete("/",auth,  deleteBooks);

export default router;