
import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestadorRoute.getAll, PrestadorController.getAll)
router.get(PrestadorRoute.getById, PrestadorController.get)

router.use(AuthMiddleware)

router.post(PrestadorRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), PrestadorController.create)
router.put(PrestadorRoute.update, PrestadorController.update)
router.delete(PrestadorRoute.delete, PrestadorController.delete)

export { router }

