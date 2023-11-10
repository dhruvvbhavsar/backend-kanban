import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export async function checkDbConnection() {
  try {
    await sql`select 1`;
    return "connected";
  } catch (error) {
    console.error("Database connection error:", error.message);
    return "disconnected";
  }
}
