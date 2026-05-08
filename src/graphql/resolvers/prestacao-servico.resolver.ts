import { PrestacaoServicoModel } from "../../models/prestacao-servico.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";

interface PrestacaoServicoCreateInput {
    prestadorId: string;
    categoriaId: string;
    titulo: string;
    descricao: string;
    imagemUrl: string | null;
    ativo: boolean;
    modalidades: string;
}

interface PrestacaoServicoUpdateInput {
    titulo?: string;
    descricao?: string;
    imagemUrl?: string | null;
    ativo?: boolean;
    modalidades?: string;
}

export const prestacaoServicoResolver = {
    Query: {
        prestacoesServicos: async (): Promise<PrestacaoServicoDBType[]> => {
            return await PrestacaoServicoModel.getAll();
        },
        prestacaoServico: async (
            _: unknown,
            { id }: { id: string },
        ): Promise<PrestacaoServicoDBType | null> => {
            return await PrestacaoServicoModel.get(id);
        },
    },
    Mutation: {
        createPrestacaoServico: async (
            _: unknown,
            args: { prestacaoServico: PrestacaoServicoDBType },
        ): Promise<PrestacaoServicoDBType | null> => {
            return await PrestacaoServicoModel.create(args.prestacaoServico);
        },
        updatePrestacaoServico: async (
            _: unknown,
            args: { id: string, prestacaoServico: PrestacaoServicoDBType },
        ): Promise<PrestacaoServicoDBType | null> => {
            return await PrestacaoServicoModel.update(args.id, args.prestacaoServico);
        },
        deletePrestacaoServico: async (
            _: unknown,
            args: { id: string },
        ): Promise<boolean> => {
            try {
                await PrestacaoServicoModel.delete(args.id);
                return true;
            } catch (error) {
                return false;
            }
        },
    },

    PrestacaoServico: {
        Servico: async (parent: { id: string }) => {
            return await ServiceModel.get(parent.id);
        },

    }
};                                          