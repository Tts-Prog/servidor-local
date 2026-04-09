import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.model.js"
import type { PropostaDBType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"


export const PropostaController = {
    async create(req: Request, res: Response) {
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse = await PropostaModel.create(propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao criar proposta" })

            return res.status(201).json({ message: "Proposta criada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao criar proposta" })
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const propostaResponse = await PropostaModel.getAll()

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar propostas" })

            return res.status(200).json({ message: "Propostas encontradas com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar propostas" })
        }
    },

    async get(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.get(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar proposta" })

            return res.status(200).json({ message: "Proposta encontrada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar proposta" })
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse = await PropostaModel.update(id as string, propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao atualizar proposta" })

            return res.status(200).json({ message: "Proposta atualizada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao atualizar proposta" })
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.delete(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao deletar proposta" })

            return res.status(200).json({ message: "Proposta deletada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao deletar proposta" })
        }
    },

    async getByPrestacaoServico(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.get(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar proposta" })

            return res.status(200).json({ message: "Proposta encontrada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar proposta" })
        }
    },

    async accept(req: Request, res: Response) {
        const { id } = req.params
        try {

            const propostaAcceptanceResponse = await PropostaModel.acceptProposal(id as string)

            // we should update prestacao servico fields once a accepted proposal based on the prestacao servico that has the orcamento id
            //fetch proposal to get id_prestacao_servico as proposalResponse does not fetch 
            //const propostaResponse = await PropostaModel.get(id as string)

            // check utils/types.ts
            //const prestacaoServicoResponse = await PrestacaoServicoModel.update(propostaResponse?.id_prestacao_servico as string, propostaResponse)

            if (!propostaAcceptanceResponse) return res.status(400).json({ message: "Erro ao aceitar proposta" })

            return res.status(200).json({ message: "Proposta aceite com sucesso", propostaAcceptanceResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao aceitar proposta" })
        }
    },
}


