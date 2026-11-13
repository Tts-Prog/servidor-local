import express, { type Request, type Response } from "express"
import { router as serviceRouter } from "./routes/servico.route.js"
import { router as orcamentoRouter } from "./routes/orcamento.route.js"
import { router as prestadorRouter } from "./routes/prestador.route.js"
import { router as userRouter } from "./routes/users.route.js"
import { router as propostaRouter } from "./routes/proposta.route.js"
import { router as prestacaoServicoRouter } from "./routes/prestacao-servico.route.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import { typeDefs } from "./graphql/index.js"
import { resolvers } from "./graphql/index.js"
import { expressMiddleware } from "@as-integrations/express5"
import jwt from "jsonwebtoken"

const app = express()
app.use(express.json())

dotenv.config()

app.use("/service", serviceRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/prestador", prestadorRouter)
app.use("/users", userRouter)
app.use("/proposta", propostaRouter)
app.use("/prestacao-servico", prestacaoServicoRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 1. Configuração do Servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Formatação de erros amigável para o Frontend (opcional, mas recomendado)
  formatError: (formattedError, error) => {
    console.error("🔥 Erro GraphQL:", formattedError.message);
    return formattedError;
  },
});

// 2. Arranque do Apollo (Tem de ser await antes de aplicar o middleware)
await server.start();

// 3. Aplicação do GraphQL ao Express no endpoint /graphql
app.use(
  "/graphql",
  expressMiddleware(server, {
    // 🛡️ O CONTEXTO: É aqui que a magia da segurança acontece!
    // Esta função corre TODAS as vezes que o frontend faz uma query.
    context: async ({ req }) => {
      // Pega no cabeçalho de autorização
      const authHeader = req.headers.authorization || "";
      let user = null;

      // Se houver um token, tentamos decodificá-lo usando a tua lógica atual
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
          // Reutilizas a mesma chave secreta do teu AuthMiddleware
          user = jwt.verify(token!, process.env.JWT_SECRET as string);
        } catch (error) {
          // Se o token for inválido, o user fica null
          // O resolver depois decide se bloqueia a ação ou não
          console.warn("Token JWT inválido ou expirado.");
        }
      }

      // Devolvemos o utilizador para dentro de TODOS os resolvers
      // Agora podes aceder a `context.user` dentro de qualquer ficheiro .resolvers.ts!
      return { user };
    },
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

app.listen(8080, () => {
  console.log("Server running on port 8080")
})
