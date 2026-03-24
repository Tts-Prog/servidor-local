import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js"
import { hashPassword } from "../utils/password.js"
import type { UserType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const UserModel = {
    async create(user: UserType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_utilizadores 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    user.nome,
                    user.numero_identificacao,
                    formatDateDDMMYYYY(user.data_nascimento),
                    user.email,
                    user.telefone,
                    user.pais,
                    user.localidade,
                    await hashPassword(user.password),
                    user.enabled,
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
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_utilizadores 
                WHERE tbl_utilizadores.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, user: UserType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_utilizadores 
                SET nome = ?, 
                numero_identificacao = ?, 
                data_nascimento = ?, 
                email = ?, 
                telefone = ?, 
                pais = ?, 
                localidade = ?,
                password = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    user.nome,
                    user.numero_identificacao,
                    formatDateDDMMYYYY(user.data_nascimento),
                    user.email,
                    user.telefone,
                    user.pais,
                    user.localidade,
                    await hashPassword(user.password),
                    user.enabled,
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
                `DELETE FROM tbl_utilizadores 
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