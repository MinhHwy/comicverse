import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD!,
  database: "comicverse",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Prisma test START");

  const result = await prisma.comic.findMany();

  console.log("Comic count:", result.length);
  console.log(result);
}

main()
  .catch((error) => {
    console.error("PRISMA ERROR:");
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });