import { PropostaModel } from "../../models/proposta.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import { OrcamentoModel } from "../../models/orcamento.models.js";
import type { PropostaDBType } from "../../utils/types.js";
import { PrestacaoServicoModel } from "../../models/prestacao-servico.model.js";

export const propostaResolver = {
    Query: {
        getAllPropostas: async () => {
            return await PropostaModel.getAll();
        },

        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        },

        getCredentials: async (_: any, args: { id: string }) => {
            const host = process.env.DB_HOST
            const password = process.env.DB_PASSWORD
            const user = process.env.DB_USER
            const db = process.env.DB_NAME

            const data = `host: ${host}, password: ${password}, user: ${user}, database: ${db}`

            return data
        }
    },

    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaDBType }) => {
            return await PropostaModel.create(args.proposta);
        },

        updateProposta: async (_: any, args: { id: string, proposta: PropostaDBType }) => {
            return await PropostaModel.update(args.id, args.proposta);
        },

        deleteProposta: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    Proposta: {
        prestador: async (parent: { id_prestador: string }) => {
            return await PrestadorModel.get(parent.id_prestador);
        },

        PrestacaoServico: async (parent: { id_prestacao_servico: string }) => {
            return await PrestacaoServicoModel.get(parent.id_prestacao_servico);
        }
    }
}