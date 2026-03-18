import express, { type Request, type Response } from "express"
import { addServicesToDB, adicionarServico, apagarServico, deleteService, getAllServices, getServiceById, listarServicos, obterServico, updateService } from "./servico.js"
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, listarPrestadoresDeServico, selecionarPrestadoresDeServico, selecionarServicos } from "./orcamento.js"
import { createUser, getUserById, getUsers } from "./users.js"
import type { ServicoDBType, UserType } from "./utils/types.js"
import { generateUUID } from "./utils/uuid.js"


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

// selecionar todos os utilizadores presentes na base de dados 
app.get("/get-users", async (req: Request, res: Response) => {
  const getUsersResponse = await getUsers()

  res.json(getUsersResponse);
})

// selecionar um utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
  const { id } = req.query

  if (id) {
    const getUserByIdResponse = await getUserById(id as string)

    if (!getUserByIdResponse) {
      res.status(404).json({
        status: "error",
        message: "Utilizador nao encontrado",
        data: null
      })
    }

    res.status(200).json({
      status: "success",
      message: "Utilizador encontrado",
      data: getUserByIdResponse
    })
  } else {
    res.status(400).json({
      status: "error",
      message: "Id eh obrigatorio",
      data: null
    })
  }
})

app.post("/create-user", async (req: Request, res: Response) => {
  const user: UserType = req.body

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Dados de utilizador invalidos",
      data: null
    })
  }

  console.log(user)

  const createUserResponse = await createUser(user)

  res.json(createUserResponse)
})

app.post("/create-service", async (req: Request, res: Response) => {
  const newService: ServicoDBType = req.body

  if (!newService) {
    return res.status(400).json({
      status: "error",
      message: "Dados de servico invalidos",
      data: null
    })
  }

  console.log(newService)

  const createServiceResponse = await addServicesToDB(newService)

  if (createServiceResponse === null) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao criar servico",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servico criado com sucesso",
    data: createServiceResponse
  })
})

app.get("/get-service-by-id/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "ID obrigatorio",
      data: null
    })
  }

  const getServiceByIdResponse = await getServiceById(id as string)

  if (!getServiceByIdResponse) {
    return res.status(404).json({
      status: "error",
      message: "Servico nao encontrado",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servico encontrado",
    data: getServiceByIdResponse
  })
})

app.get("/get-all-services", async (req: Request, res: Response) => {
  const getAllServicesResponse = await getAllServices()

  if (!getAllServicesResponse) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao selecionar servicos",
      data: null
    })
  }

  res.status(200).json({
    status: "success",
    message: "Servicos encontrados",
    data: getAllServicesResponse
  })
})

app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  const updatedService: ServicoDBType = req.body

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "ID obrigatorio",
      data: null
    })
  }

  if (!updatedService) {
    return res.status(400).json({
      status: "error",
      message: "Dados de servico invalidos",
      data: null
    })
  }

  const updateServiceResponse = await updateService(id as string, updatedService)

  if (!updateServiceResponse) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao atualizar servico",
      data: null
    })
  }

  return res.status(200).json({
    status: "success",
    message: "Servico atualizado com sucesso",
    data: updateServiceResponse
  })
})

app.delete("/delete-service-by-id/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "ID obrigatorio",
      data: null
    })
  }

  const deleteServiceResponse = await deleteService(id as string)

  if (!deleteServiceResponse) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao apagar servico",
      data: null
    })
  }

  return res.status(200).json({
    status: "success",
    message: "Servico apagado com sucesso",
    data: deleteServiceResponse
  })
})

app.listen(8080, () => {
  console.log("Server running on port 8080")
})

