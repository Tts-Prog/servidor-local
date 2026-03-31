import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    // Bearer fsdrfbdsknoicnoinicuckdcbscbscbs.dociabsciusbc8ewdbceiucbeiubfeuibf

    if (!authHeader) {
        return res.status(401).json({ message: "Utilizador nao authenticado" })
    }

    const token = authHeader.split(" ")[1]
    // ["Bearer", "fsdrfbdsknoicnoinicuckdcbscbscbs.dociabsciusbc8ewdbceiucbeiubfeuibf"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string)

        next()

    } catch (error) {
        return res.status(401).json({ message: "Token invalido" })
    }

}


/*
    req: {
        headers: {
            authorization: "Bearer fsdrfbdsknoicnoinicuckdcbscbscbs.dociabsciusbc8ewdbceiucbeiubfeuibf"
        
        }
    }


    const nome = "Tiago Miguel Soares"

    nome.split(" ")

    // ["Tiago", "Miguel", "Soares"]

*/