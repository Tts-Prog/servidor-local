import type { Request, Response } from "express"
import { EstadoProposta, type OrcamentoDBType, type PrestadorDBType, type PropostaDBType, type ResponseType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.models.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { PrestadorModel } from "../models/prestador.model.js"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: OrcamentoDBType = req.body

        if (!orcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        }

        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse: OrcamentoDBType[] | null = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<OrcamentoDBType[]> = {
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
        }

        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getOrcamentoByIdResponse: OrcamentoDBType | null = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        }

        return res.status(200).json(response)

    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    },

    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        // logic based on the following 
        // accepted proposal bring id_prestador which has urgency tax, minimum for discount and discount percentage according to types in utils/types.ts
        // proposal has preco_hora and estimated hours according to utils/types.ts

        // then calculate budget

        // to fetch proposals we need to fetch prestacao_servico first
        const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string)

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            }

            return res.status(404).json(response)
        }

        // fetch all proposal 
        const proposals: PropostaDBType[] | null = await PropostaModel.getByPrestacaoServico(prestacaoServico.id as string)

        if (!proposals) {
            return res.status(404).json({
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            })
        }

        // find accepted proposal
        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)

        if (!acceptedProposal) {
            return res.status(404).json({
                status: "error",
                message: "Ainda nenhuma proposta foi aceite.",
                data: null
            })
        }

        const precoHora = acceptedProposal.precoHora
        const horasEstimadas = acceptedProposal.horasEstimadas

        // fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utils/types.ts
        const prestador = await PrestadorModel.get(acceptedProposal.idPrestador)

        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            })
        }

        const urgencyTax = prestador.taxaUrgencia
        const minimumDiscount = prestador.minimoDesconto
        const discountPercentage = prestador.percentagemDesconto


        // calculate the budget based on utils/types.ts
        let subtotal = precoHora * horasEstimadas

        // if minimum discount is greater than discount percentage
        if (subtotal > minimumDiscount) {
            subtotal = subtotal * (1 - discountPercentage)
        }

        if (prestacaoServico.urgente) {
            // add urgency tax
            subtotal = subtotal * (1 + urgencyTax)
        }

        const updateOrcamentoResponse: OrcamentoDBType = await OrcamentoModel.updateBudget(id as string, subtotal)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            })
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento calculado e atualizado com sucesso",
            data: updateOrcamentoResponse
        }

        return res.status(200).json(response)
    }
}
