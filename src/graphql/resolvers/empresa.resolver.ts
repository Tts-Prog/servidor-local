import { EmpresaModel } from "../../models/empres.model.js";

const empresaResolvers = {
    // Query: Para ler dados
    Query: {
        // GET /empresas
        getEmpresas: async () => {
            return await EmpresaModel.getAll();
        },

        // GET /empresas/:id
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await EmpresaModel.getById(args.id);
        },
    },

    // Mutation: Para criar/atualizar/deletar dados
    Mutation: {
        // POST /empresas
        criarEmpresa: async (
            _: any,
            args: { designacao: string, localizacao: string, descricao: string, enabled: boolean, id_utilizador: string, nif: string, icone: string, id: string, created_at: string, updated_at: string },
        ) => {
            return await EmpresaModel.create(args);
        },
    },

    // Field Resolver: Para resolver relacionamentos
    // Quando pedem empresa.servicos, este método é chamado
    Empresa: {
        servicos: async (parent: { id: string }) => {
            // parent é o objeto da empresa que acabámos de buscar
            return await EmpresaModel.getById(parent.id);
        },
    },
};

export { empresaResolvers };