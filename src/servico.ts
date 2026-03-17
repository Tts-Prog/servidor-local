
import db from "./lib/db.js";
import { type ResponseType, type ServicoDBType, type ServicoType } from "./utils/types.js"

export let catalogoServicos: ServicoType[] = []

// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}

export async function addServicesToDB(newService: ServicoDBType) {
    console.log({ newService })

    try {

        const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?)`

        const values = [
            null,
            newService.nome,
            newService.descricao,
            newService.categoria,
            newService.enabled,
            new Date(),
            new Date()
        ]

        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getServiceById(id: string) {
    try {
        const query = `SELECT * FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllServices() {
    try {
        const query = `SELECT * FROM tbl_servicos`

        const [rows] = await db.execute(query)

        //return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        return rows

    } catch (error) {
        console.log(error)
        return null
    }
}

// update de dados
export async function updateService(id: string, updatedService: ServicoDBType) {
    try {
        const query = `UPDATE tbl_servicos 
                        SET 
                            nome=?,
                            descricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`

        const values = [
            updatedService.nome,
            updatedService.descricao,
            updatedService.categoria,
            updatedService.enabled,
            new Date(),
            id
        ]

        const rows = await db.execute(query, values)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function deleteService(id: string) {
    try {
        const query = `DELETE FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}