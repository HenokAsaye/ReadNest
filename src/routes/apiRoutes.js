import { Router } from "express";
import { getBooks,searchBooks } from "../controllers/apiControllers";
const router = Router();

router.get("/",getBooks)
router.get("/search",searchBooks)
export default router
