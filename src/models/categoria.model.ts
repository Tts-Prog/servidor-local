import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { CategoriaDBType } from "../utils/types.js";

export const CategoriaModel = {
    getAll: async (): Promise<CategoriaDBType[] | null> => {
        try {
            const [result] = await db.execute<CategoriaDBType[] & RowDataPacket[]>("SELECT * FROM categoria");

            return result as CategoriaDBType[];
        } catch (error) {
            console.error("Error fetching categorias:", error);
            return null;
        }
    },

    get: async (id: string): Promise<CategoriaDBType | null> => {
        try {
            const [result] = await db.execute<CategoriaDBType & RowDataPacket[]>("SELECT * FROM categoria WHERE id = ?", [id]);

            return result as CategoriaDBType;
        } catch (error) {
            console.error("Error fetching categorias:", error);
            return null;
        }
    },

    create: async (categoria: CategoriaDBType): Promise<CategoriaDBType | null> => {
        try {
            const [result] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                "INSERT INTO categoria (designacao, icone, created_at, updated_at) VALUES (?, ?, ?, ?)",
                [categoria.designacao, categoria.icone, categoria.created_at, categoria.updated_at]
            );

            return result as CategoriaDBType;
        } catch (error) {
            console.error("Error creating categoria:", error);
            return null;
        }
    },

    update: async (id: string, categoria: CategoriaDBType): Promise<CategoriaDBType | null> => {
        try {
            const [result] = await db.execute<CategoriaDBType & RowDataPacket[]>(
                "UPDATE categoria SET designacao = ?, icone = ?, updated_at = ? WHERE id = ?",
                [categoria.designacao, categoria.icone, categoria.updated_at, id]
            );

            return result as CategoriaDBType;
        } catch (error) {
            console.error("Error updating categoria:", error);
            return null;
        }
    },

    delete: async (id: string): Promise<CategoriaDBType | null> => {
        try {
            const [result] = await db.execute<CategoriaDBType & RowDataPacket[]>("DELETE FROM categoria WHERE id = ?", [id]);

            return result as CategoriaDBType;
        } catch (error) {
            console.error("Error deleting categoria:", error);
            return null;
        }
    }



}