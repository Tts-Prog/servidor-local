import { Router } from "express"
import { ServicoController } from "../controllers/servico.controller.js"

const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(ServiceRoute.create, ServicoController.createServico)
router.get(ServiceRoute.getAll, ServicoController.getAll)
router.get(ServiceRoute.getById, ServicoController.get)
router.put(ServiceRoute.update, ServicoController.update)
router.delete(ServiceRoute.delete, ServicoController.delete)

export { router }

