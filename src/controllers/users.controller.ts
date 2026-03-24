import type { Request, Response } from "express"
import type { UserType } from "../utils/types.js"
import { UserModel } from "../models/users.model.js"

export const UserController = {
    async create(req: Request, res: Response) {
        const user: UserType = req.body

        if (!user) {
            res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        console.log(user)

        const createUserResponse = await UserModel.create(user)

        res.json(createUserResponse)
    },

    async getAll(req: Request, res: Response) {
        const getAllUsersResponse = await UserModel.getAll()

        if (!getAllUsersResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizadores buscados com sucesso",
            data: getAllUsersResponse
        })
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getUserByIdResponse = await UserModel.get(id as string)

        if (!getUserByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: getUserByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedUser: UserType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null
            })
        }

        const updateUserResponse = await UserModel.update(id as string, updatedUser)

        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteUserResponse = await UserModel.delete(id as string)

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        })
    }
}