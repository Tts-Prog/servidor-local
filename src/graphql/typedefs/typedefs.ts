
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        CLIENTE,
        ADMIN,
        PRESTADOR,
        EMPRESA
    }
    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADO
    }

    enum EstadoPrestacaoServico {
        PENDENTE,
        FINALIZADO,
        EM_PROGRESSO,
        CANCELADO
    }

    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }
    
    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Proposta {
        id: ID!,
        idPrestacaoServico: PrestacaoServico,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: Prestador,
        owner: String,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type Servico {
        id: ID!,
        nome: String!,
        descricao: String,
        categoria: Categoria,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Prestador {
        id: ID!,
        taxaUrgencia: Float,
        percentagemDesconto: Float,
        minimoDesconto: Float,
        nif: String!,
        profissao: String!,
        enable: Boolean,
        created_at: String,
        updated_at: String
    }

    type Orcamento {
        id: ID!,
        total: Float,
        idUtilizadores: Utilizador!,
        enabled: Boolean,
        createdAt: String,
        updatedAt: String
    } 

    type PrestacaoServico {
        id: ID!,
        designacao: String,
        subtotal: Float,
        horas_estimadas: Int,
        id_prestador: Prestador,
        id_servico: Servico,
        preco_hora: Float,
        estado: EstadoPrestacaoServico,
        id_orcamento: Orcamento,
        id_utilizador: Utilizador,
        id_empresa: Empresa,
        tipo_prestador: TipoPrestador,
        urgente: Boolean,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }           
    
    type Empresa {
        id: ID!,
        designacao: String!,
        descricao: String,
        nif: String,
        icone: String,
        id_utilizador: ID!,
        localizacao: String,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Categoria {
        id: ID!,
        designacao: String!,
        icone: String,
        servico: Servico,
        created_at: String,
        updated_at: String
    }

    input ServiceInput {
        nome: String!, 
        descricao: String, 
        categoria: String!, 
        enabled: Boolean
    }

    input UserInput {
        nome: String!, 
        numero_identificacao: String!, 
        data_nascimento: String!, 
        email: String!, 
        telefone: String!, 
        pais: String!, 
        localidade: String, 
        password: String, 
        role: Role, 
        enabled: Boolean
    }

    type Query {
        getCredentials: String

        getAllUsers: [Utilizador]
        getUserById(id: ID!): Utilizador
        getAllServices: [Servico]
        getServiceById(id: ID!): Servico
        getAllPropostas: [Proposta]
        getPropostaById(id: ID!): Proposta
    }

    type Mutation {
        createUser(
            user: UserInput
        ): Utilizador
        updateUser(
            id: ID!, 
            nome: String!, 
            numero_identificacao: String!, 
            data_nascimento: String!, 
            email: String!, 
            telefone: String!, 
            pais: String!, 
            localidade: String, 
            password: String, 
            role: Role, 
            enabled: Boolean): Utilizador
        deleteUser(id: ID!): Utilizador
        createService(
            service: ServiceInput
        ): Servico
        updateService(
            id: ID!, 
            nome: String!, 
            descricao: String, 
            categoria: String, 
            enabled: Boolean): Servico
        deleteService(id: ID!): Servico

        createProposta(
            idPrestacaoServico: ID!,
            precoHora: Float!,
            horasEstimadas: Int!,
            estado: EstadoProposta!,
            idPrestador: ID!,
            owner: String!,
            enabled: Boolean!
        ): Proposta
        updateProposta(
            id: ID!,
            idPrestacaoServico: ID!,
            precoHora: Float!,
            horasEstimadas: Int!,
            estado: EstadoProposta!,
            idPrestador: ID!,
            owner: String!,
            enabled: Boolean!
        ): Proposta
        deleteProposta(id: ID!): Proposta
    }
        

`