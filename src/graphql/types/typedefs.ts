import { gql } from "graphql-tag";

const typeDefs = gql`
  # 1. Definição dos Tipos de Dados (O que existe na BD)
  # O "!" significa que é obrigatório (NOT NULL)

  type Utilizador {
    id: ID!
    nome: String!
    email: String!
    role: String!
  }

  type Empresa {
    id: ID!
    designacao: String!
    localizacao: String!
    icone: String
    # Relacionamento: Uma empresa tem muitos serviços
    servicos: [Servico]
  }

  type Prestador {
    id: ID!
    nome_fantasia: String!
  }

  type Servico {
    id: ID!
    nome: String!
    descricao: String
    preco_base: Float!
    # Relacionamento: Um serviço pertence a uma empresa
    empresa: Empresa
  }

  type Proposta {
    id: ID!
    descricao: String!
    preco_hora: Float!
    horas_estimadas: Int!
    # Relacionamento: Uma proposta pertence a um prestador
    prestador: Prestador
  }

  # 2. QUERIES (O equivalente ao GET)
  # Aqui definimos as perguntas que o Frontend pode fazer
  type Query {
    # Exemplo: GET /empresas
    getEmpresas: [Empresa]
    
    # Exemplo: GET /empresas/:id
    getEmpresaById(id: ID!): Empresa
    
    # Exemplo: GET /servicos
    getServicos: [Servico]
    
    # Exemplo: GET /servicos/:id
    getServicoById(id: ID!): Servico
    
    # Exemplo: GET /propostas
    getPropostas: [Proposta]
  }

  # 3. MUTATIONS (O equivalente ao POST/PUT/DELETE)
  # Aqui definimos as ações que o Frontend pode executar
  type Mutation {
    # Exemplo: POST /empresas
    criarEmpresa(nome: String!, descricao: String): Empresa
    
    # Exemplo: PUT /empresas/:id
    atualizarEmpresa(id: ID!, nome: String, descricao: String): Empresa
    
    # Exemplo: DELETE /empresas/:id
    deletarEmpresa(id: ID!): String
    
    # Exemplo: POST /servicos
    criarServico(nome: String!, descricao: String, preco_base: Float!): Servico
  }
`;

export { typeDefs };