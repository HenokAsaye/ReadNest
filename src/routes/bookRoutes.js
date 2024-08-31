import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
   addBook,
   getUserBooks,
   updateBookStatus,
   deleteBooks,
} from "../controllers/bookController.js";
import {validateAddBook ,validateUpdateBook} from "../validators/bookValidators.js"
const router = Router();


router.get("/", auth, getUserBooks);
router.post("/",auth,validateAddBook,  addBook);
router.patch("/",auth,validateUpdateBook,  updateBookStatus);
router.delete("/",auth,  deleteBooks);


export default router;