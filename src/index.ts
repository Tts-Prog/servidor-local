import express, { type Request, type Response } from "express"
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js"
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, listarPrestadoresDeServico, selecionarPrestadoresDeServico, selecionarServicos } from "./orcamento.js"

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
  const novoServico = req.body

  const addServicoResponse = adicionarServico(novoServico)

  res.json(addServicoResponse)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
  const listServicoResponse = listarServicos()

  res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string)

    res.json(apagarServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const obterServicoResponse = obterServico(nome as string)

    res.json(obterServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const { nome } = req.body

  const selecinarServicoResponse = selecionarServicos(nome as string)

  res.json(selecinarServicoResponse)
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const { pedido } = req.body

  const calcularOrcamentoresponse = calcularOrcamento(pedido)

  res.json({
    message: "Orcamento calculado com sucesso",
    orcamentoTotal: calcularOrcamentoresponse
  })
})

// rota para selecionar prestador de servico
app.post("/selecionar-prestador", (req: Request, res: Response) => {
  const { nomeDePrestador } = req.body

  const selecionaPrestadorResponse = selecionarPrestadoresDeServico(nomeDePrestador as string)

  res.json({
    status: selecionaPrestadorResponse,
    message: "Prestador de servico selecionado com sucesso"
  })
})

// rota para criar prestadores de servico 
app.post("/criar-prestador", (req: Request, res: Response) => {
  // pegar o corpo de requisicao com os dados do novo prestador
  const novoPrestador = req.body

  const criarPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

  res.json(criarPrestadorResponse)
})

app.get("/listar-prestadores", (req: Request, res: Response) => {
  const listPrestadorResponse = listarPrestadoresDeServico()

  res.json(listPrestadorResponse)
})

app.put("/editar-prestador", (req: Request, res: Response) => {
  const { nomeDoPrestador, novosDadosDoPrestador } = req.body

  const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)

  res.json(editarPrestadorResponse)
})

app.delete("/apagar-prestador", (req: Request, res: Response) => {
  const { nomeDoPrestador } = req.query

  if (nomeDoPrestador) {
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomeDoPrestador as string)

    res.json(apagarPrestadorResponse)
  } else {
    res.json({
      message: "Nome do prestador eh obrigatorio"
    })
  }
})

app.listen(8080, () => {
  console.log("Server running on port 8080")
})