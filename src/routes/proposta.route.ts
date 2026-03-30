
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"

const PropostaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PropostaRoute.create, PropostaController.create)
router.get(PropostaRoute.getAll, PropostaController.getAll)
router.get(PropostaRoute.getById, PropostaController.get)
router.put(PropostaRoute.update, PropostaController.update)
router.delete(PropostaRoute.delete, PropostaController.delete)

export { router }