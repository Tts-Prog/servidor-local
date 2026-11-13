
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.model.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"

const PropostaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    accept: "/accept/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.post(PropostaRoute.create, PropostaController.create)
router.get(PropostaRoute.getAll, PropostaController.getAll)
router.get(PropostaRoute.getById, PropostaController.get)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PropostaController.delete)
router.put(PropostaRoute.accept, authorize([Role.ADMIN, Role.CLIENTE]), PropostaController.accept)

export { router }