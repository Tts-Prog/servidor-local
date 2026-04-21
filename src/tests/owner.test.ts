import { isOwner } from "../security/auth.middleware.js";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

describe("Unit Test: isOwner Middleware", () => {
    let mockRequest: any;
    let mockResponse: any;
    let nextFunction: any = jest.fn();

    // formatacao de resposta mockada para o teste
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it("Deve retornar 403 se o utilizador não for o dono do recurso", async () => {
        // 1. Simulação de um utilizador logado (ID: "user_123")
        mockRequest = {
            user: { id: "user_123" },
            params: { id: "servico_999" },
        };

        // 2. Simulação do Model (ID do dono na BD é "outro_user")
        const mockModel = {
            get: jest.fn<any>().mockResolvedValue({ id_utilizador: "outro_user" }),
        };

        const middleware = isOwner(mockModel, "id_utilizador");
        await middleware(mockRequest, mockResponse, nextFunction);

        // 3. Verificação: Deve bloquear com 403
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Permissao insuficiente",
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });
});