import { Router } from "express";

const router = Router()

router.post("/create", (req, res) => {
    return res.json({
        message: "User created"
    })
})

export default router