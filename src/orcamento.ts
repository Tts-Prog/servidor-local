import { catalogoServicos } from "./servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType } from "./utils/types.js"


const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
const prestadoresDeServico: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []

// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}

//funcao para seleciona prestadores 
export function selecionarPrestadoresDeServico(nomeDoPrestador: string) {
    // ciclo for que percorre o array de prestadoresDeServico
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        //  if que verifica se o item [i] do array eh igual ao nome recebido
        if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
            // se for igual, adiciona o item [i] ao array prestadoresSelecionados.push
            prestadoresSelecionados.push(prestadoresDeServico[i]!)
            // retornar verdadeiro
            return true
        }
    }
    // senao return false
    return false
}


// fucnao para criar prestadores de servico
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja esta no array
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador ja existir, retorna uma mensagem de erro
            return {
                status: false,
                message: "Ja existe um prestador de servico com esse nome",
                data: null
            }
        }
    })

    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServico.push(novoPrestador)
    return {
        status: true,
        message: "Prestador de servico adicionado com sucesso",
        data: novoPrestador
    }
}

// funcao para editar um prestador de servico
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorType) {
    // encontrar o prestador de servico a editar na minha lista 
    // ciclo que percorre a lista e verifica o nome do prestador de servico

    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {

        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia

            return {
                status: true,
                message: "Prestador de servico editado com sucesso",
                data: prestadorExistente
            }
        }
    })

    // se nao existir nenhum prestador com o nome recebido, retorna uma mensagem de erro
    return {
        status: false,
        message: "Nao existe nenhum prestador de servico com esse nome",
        data: null
    }
}

export function listarPrestadoresDeServico() {
    return prestadoresDeServico
}
// pretadoresDeServico.replace()
// funcao para apagar um prestador de servico
export function apagarPrestadorDeServico(nomeDoPrestador: string) {
    // ciclo para percorre a lista de prestadores
    // for (let i = 0; i < prestadoresDeServico.length; i++) {
    //     // if para verificar se o nome do prestador for igual ao nome recebido, 
    //     if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
    //         // se encontrado, remover o prestador
    //         // prestadoresDeServico.splice(i, 1)
    //         // prestadoresDeServico.replace(i, "")   
    //         // retornar uma mensagem de sucesso
    //     }
    // }

    // prestadoresDeServico.find() // se encontrar, devolve o item
    // prestadoresDeServico.some() // se encontrar, devolve true

    // validacao do nome do prestador 
    if (nomeDoPrestador === "") {
        return {
            status: false,
            message: "Nome do prestador eh obrigatorio",
            data: null
        }
    }

    const prestadorExiste = prestadoresDeServico.some(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome === nomeDoPrestador
    )

    if (!prestadorExiste) {
        return {
            status: false,
            message: "Nao existe nenhum prestador de servico com esse nome",
            data: null
        }
    }


    prestadoresDeServico.filter(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome !== nomeDoPrestador
    )

    return {
        status: true,
        message: "Prestador de servico apagado com sucesso",
        data: prestadoresDeServico
    }

}
// funcao para obter um prestador de servico pelo nome 




// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal

    // () => {} --- arrow function
    // function () {} --- function normal

    /* 
    
    urgente: true
    taxaUrgencia: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0.3 = 30
    totalFinal: 100 + 30 = 130

    totalBruto: 100
    totalbruto apos urgencia: 150
    minimo descnto: 100
    percentagem: 10%
    desconto sobre total final: 150 * 0.1 = 15
    desconto sobre total bruto: 100 * 0.1 = 10

    */
}
