import { ServiceModel } from "../../models/servico.model.js";
import { EmpresaModel } from "../../models/empres.model.js";

const servicoResolvers = {
    // Query: Para ler dados
    Query: {
        // GET /servicos
        getServicos: async () => {
            return await ServiceModel.getAll();
        },

        // GET /servicos/:id
        getServicoById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        },
    },

    // Mutation: Para criar/atualizar/deletar dados
    Mutation: {
        // POST /servicos
        criarServico: async (
            _: any,
            args: { nome: string, descricao: string, preco_base: number, categoria: string, enabled: boolean, id_empresa: string, id: string, created_at: string, updated_at: string },
        ) => {
            return await ServiceModel.create(args);
        },
    },

    // Field Resolver: Para resolver relacionamentos
    // Quando pedem servico.empresa, este método é chamado
    Servico: {
        empresa: async (parent: { id_empresa: string }) => {
            // parent é o objeto do serviço que acabámos de buscar
            return await EmpresaModel.getById(parent.id_empresa);
        },
    },
};

export { servicoResolvers };