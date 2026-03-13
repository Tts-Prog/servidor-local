import db from "./lib/db.js"
import type { UserType } from "./utils/types.js"


export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

    return rows
}

export async function getUserById(id: string) {
    // track query execution in function db.execute 
    console.log("getUserById", id)

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
}

export async function createUser(user: UserType) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user.id,
                user.nome,
                user.numero_identificacao,
                user.data_nascimento,
                user.email,
                user.telefone,
                user.pais,
                user.localidade,
                user.password,
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
}




