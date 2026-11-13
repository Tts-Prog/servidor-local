import db from "../lib/db.js";
import type { EmpresaDBType } from "../utils/types.js";

export const EmpresaModel = {
    async create(newEmpresa: EmpresaDBType) {
        try {
            const query = `INSERT INTO tbl_empresa VALUES (?, ?, ?, ?, ?, ?, ?)`

            const values = [
                null,
                newEmpresa.designacao,
                newEmpresa.localizacao,
                newEmpresa.id_utilizador,
                newEmpresa.nif,
                newEmpresa.icone,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tbl_empresa`

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getById(id: string) {
        try {
            const query = `SELECT * FROM tbl_empresa WHERE id = ?`

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, empresaAtualizada: EmpresaDBType) {
        try {
            const query = `UPDATE tbl_empresa 
                        SET 
                            designacao=?,
                            localizacao=?,
                            id_utilizador=?,
                            nif=?,
                            icone=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`

            const values = [
                empresaAtualizada.designacao,
                empresaAtualizada.localizacao,
                empresaAtualizada.id_utilizador,
                empresaAtualizada.nif,
                empresaAtualizada.icone,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM tbl_empresa WHERE id = ?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    }
}