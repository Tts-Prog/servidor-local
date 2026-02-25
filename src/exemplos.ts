import express from "express";

const app = express();

interface AlunosType {
    nome: string;
    endereco: string;
    contato?: string | null;
}

const alunos: Array<AlunosType> = [
    {
        nome: "Tiago",
        endereco: "Rua A",
        contato: "123456789"
    },
]

let horasTrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let desconto: number = 10;


let variavel: string = "variavel";
desconto === taxaUrgencia && desconto > taxaUrgencia ?
    taxaUrgencia += desconto : taxaUrgencia -= desconto;



function calcularTotal() {
    let total: number = 10;
    total = (horasTrabalhadas * precoHora) + taxaUrgencia - desconto;
    return total
}
function meuNome(nome: string) {
    return "Ola " + nome
}

function orcamento(precoHora: number, horasTrabalhadas: number, taxaUrgencia: number, desconto: number) {
    let total: number = 0;
    total = (horasTrabalhadas * precoHora) + taxaUrgencia - desconto;
    return total
}

const aEnviar = orcamento(15, 19, 10, 5)

const nome = meuNome("Tiago")

console.log(nome) // Ola Tiago
console.log(aEnviar) // 290

const valorAReceber = calcularTotal()

console.log("valor a receber: ", valorAReceber)

app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});



app.listen(8080, () => {
    console.log("Server running on port 8080");
});


interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

const pedodoServico: PedidoServico = {
    cliente: "Tiago",
    descricao: "Serviço de TI",
    horasEstimadas: 10,
    urgente: true
}

