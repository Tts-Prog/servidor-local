import mysql from "mysql2/promise"

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Webpass2334!",
    database: "servidor_local"
})

export default db