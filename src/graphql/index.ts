import { typeDefs } from "./typedefs/typedefs.js";
import { userResolver } from "./resolvers/users.resolver.js";
import { servicoResolver } from "./resolvers/servico.resolver.js";
import { propostaResolver } from "./resolvers/proposta.resolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...servicoResolver.Query,
        ...propostaResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...servicoResolver.Mutation,
        ...propostaResolver.Mutation,
    }
}

export { typeDefs }

