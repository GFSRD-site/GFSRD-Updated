import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";

dotenv.config({ override: true });

const seedAdmin = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL || "admin@gfsrd.org";
  const password = process.env.ADMIN_PASSWORD || "admin12345";
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${email}`);
};

void seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
