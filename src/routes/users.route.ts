import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

const router = Router()

router.post("/create", UserController.create)

router.get("/", UserController.getAll)

router.get("/:id", UserController.getById)

router.put("/:id", UserController.update)

router.delete("/:id", UserController.delete)

export { router }