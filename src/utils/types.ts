
export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface ServicoType {
    nome: string,
    precoHora: number
    categoria: string
    minimoDescontado: number
    percentagemDesconto?: number
}

export interface PrestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number
}

export interface UserType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestadorDBType {
    id: string,
    taxaUrgencia: number,
    percentagemDesconto: number,
    minimoDesconto: number,
    nif: string,
    profissao: string,
    enable: boolean,
    created_at: string,
    updated_at: string
}

export interface OrcamentoDBType {
    id: string,
    total: number,
    idUtilizadores: string,
    enabled: boolean,
    createdAt: string,
    updatedAt: string
}

export enum EstadoProposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em_progresso",
    CANCELADO = "cancelado"
}

export interface PropostaDBType {
    id: string,
    idPrestacaoServico: string,
    precoHora: number,
    horasEstimadas: number,
    estado: EstadoProposta,
    idPrestador: string,
    enabled: boolean,
    createdAt: string,
    updatedAt: string
}

export interface PrestacaoServicoDBType {
    id: string,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: EstadoPrestacaoServico,
    id_orcamento: string,
    urgente: boolean,
    enabled: boolean,
    created_at: string,
    updated_at: string
}