import { Router } from "express";
import { addSong, getSong } from "../controllers/song";

const router = Router();

router.post('/',(req, res) => {
    return addSong(req,res)
})
router.get('/', (req, res) => {
    return getSong(req, res)
})

export default router