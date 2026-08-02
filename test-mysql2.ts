import "dotenv/config";
import mysql from "mysql2/promise";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL không tồn tại");
}

const url = new URL(connectionString);

console.log("Host:", url.hostname);
console.log("Port:", url.port);
console.log("Database:", url.pathname.replace("/", ""));

async function main() {
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: Number(url.port),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace("/", ""),
    connectTimeout: 15000,
  });

  console.log("MYSQL2 CONNECT OK!");

  const [rows] = await connection.query(
    "SELECT COUNT(*) AS total FROM comics"
  );

  console.log(rows);

  await connection.end();
}

main().catch((error) => {
  console.error("MYSQL2 ERROR:");
  console.error(error);
});