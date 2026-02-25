const taxaUrgencia: number = 0.3

interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

function calcularOrcamento(pedido: PedidoServicoType, precoHora: number,) {
    let total: number = 0;

    total = (pedido.horasEstimadas * precoHora)

    pedido.urgente ? total *= taxaUrgencia : total

    return total
}