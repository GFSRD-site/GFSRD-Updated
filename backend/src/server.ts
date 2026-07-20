import dotenv from "dotenv";
import { app } from "./app";
import { prisma } from "./config/prisma";

dotenv.config({ override: true });

const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

const shutdown = async (): Promise<void> => {
  await prisma.$disconnect();

  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", () => {
  void shutdown();
});

process.on("SIGTERM", () => {
  void shutdown();
});
