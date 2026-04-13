import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `INSERT INTO tbl_orcamentos 
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.idUtilizadores,
                    orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )

            return rows as OrcamentoDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_orcamentos")

        return rows as OrcamentoDBType[]
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamentos 
                WHERE tbl_orcamentos.id = ?`,
                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as OrcamentoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, orcamento: Partial<OrcamentoDBType>) {
        try {
            const query = `UPDATE tbl_orcamentos SET total = ?, id_utilizadores = ?, enabled = ?, updated_at = ? WHERE id = ?`

            const queryValues: (number | string | boolean | Date)[] = [
                orcamento.total!,
                orcamento.idUtilizadores!,
                orcamento.enabled!,
                new Date(),
                id
            ];
            const [rows] = await db.execute(
                query,
                queryValues
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
                `DELETE FROM tbl_orcamentos 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}


