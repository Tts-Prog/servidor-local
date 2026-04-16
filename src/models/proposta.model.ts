import db from "../lib/db.js"
import { EstadoProposta, type PropostaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import { type RowDataPacket } from "mysql2"

export const PropostaModel = {
    async create(proposta: PropostaDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_propostas 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    proposta.idPrestacaoServico,
                    proposta.precoHora,
                    proposta.horasEstimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_propostas")

        return rows
    },

    async get(id: string): Promise<PropostaDBType | null> {
        try {
            // types this the correct way 
            // rows is an array of objects in this case I want to get the array of proposals, mind type errors
            //Type '[QueryResult, FieldPacket[]]' is not assignable to type 'PropostaDBType[]'.
            // do not use any as type
            // use the correct type from utils/types.ts
            // fix it so it works for that error above

            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT DISTINCT 
                    pt.*, 
                    pr.id as owner 
                FROM tbl_propostas pt
                INNER JOIN tbl_prestadores pr ON pt.id_prestador = pr.id
                INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                WHERE pt.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0]! : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: PropostaDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_propostas 
                SET id_prestacao_servico = ?, 
                preco_hora = ?, 
                horas_estimadas = ?, 
                estado = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    proposta.idPrestacaoServico,
                    proposta.precoHora,
                    proposta.horasEstimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_propostas 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getByPrestacaoServico(idPrestacaoServico: string): Promise<PropostaDBType[] | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_propostas 
                WHERE tbl_propostas.id_prestacao_servico = ?`,

                [idPrestacaoServico]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async acceptProposal(id: string) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_propostas 
                SET estado = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    EstadoProposta.ACEITE,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },
}
