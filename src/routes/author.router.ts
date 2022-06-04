import express from "express"
import author from "../controllers/author.controller"

const router = express.Router()

router.post("/author", author.author)
router.get('/authors', author.getAuthors);
router.get('/author', author.getAuthor);
router.patch('/author', author.updateAuthor);
router.delete('/author', author.deleteAuthor);
export = router
