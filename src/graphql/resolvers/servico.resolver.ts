
import { CategoriaModel } from "../../models/categoria.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { ServicoDBType } from "../../utils/types.js";

export const servicoResolver = {
    Query: {
        getAllServices: async () => {
            return await ServiceModel.getAll();
        },

        getServiceById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },

    Mutation: {
        createService: async (_: any, args: { service: ServicoDBType }) => {
            const service: ServicoDBType = {
                id: "",
                nome: args.service.nome,
                descricao: args.service.descricao,
                categoria: args.service.categoria,
                enabled: args.service.enabled,
                created_at: "",
                updated_at: ""
            }
            return await ServiceModel.create(service);
        },

        updateService: async (_: any, args: { id: string, service: ServicoDBType }) => {
            return await ServiceModel.update(args.id, args.service);
        },

        deleteService: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    Empresa: {
        categoria: async (parent: { id: string }) => {
            return await CategoriaModel.get(parent.id);
        }
    }
}