import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

const UserRoute = {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    resetPassword: "/reset-password/:id",
    login: "/login"
}

const router = Router()

router.post(UserRoute.create, UserController.create)

router.get(UserRoute.getAll, UserController.getAll)

router.get(UserRoute.getById, UserController.getById)

router.put(UserRoute.update, UserController.update)

router.delete(UserRoute.delete, UserController.delete)

router.put(UserRoute.resetPassword, UserController.resetPassword)

router.post(UserRoute.login, UserController.login)

export { router }