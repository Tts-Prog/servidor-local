import { typeDefs } from "./types/typedefs.js";
import { empresaResolvers } from "./resolvers/empresa.resolver.js";
import { servicoResolvers } from "./resolvers/servico.resolver.js";


export const resolvers = {
    // 1. Unir todas as Queries (Leituras)
    Query: {
        ...empresaResolvers.Query,
        ...servicoResolvers.Query,
    },

    // 2. Unir todas as Mutations (Escritas)
    Mutation: {
        ...servicoResolvers.Mutation,
    },

    // 3. Declarar os Field Resolvers (Pontes)
    Servico: servicoResolvers.Servico,
};

export { typeDefs };