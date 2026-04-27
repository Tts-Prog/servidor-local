import db from "../lib/db.js"
import type { EmpresaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const EmpresaModel = {
    async create(empresa: EmpresaDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_empresas 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    null,
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.enabled,
                    empresa.id_utilizador,
                    empresa.icone,
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
        const [rows] = await db.execute("SELECT * FROM tbl_empresas")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_empresas 
                WHERE tbl_empresas.id = ?`,
                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, empresa: EmpresaDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_empresas 
                SET nome = ?, 
                descricao = ?, 
                localizacao = ?, 
                nif = ?, 
                enabled = ?, 
                id_utilizador = ?, 
                icone = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.enabled,
                    empresa.id_utilizador,
                    empresa.icone,
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
                `DELETE FROM tbl_empresas 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}