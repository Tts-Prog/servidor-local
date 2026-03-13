
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
