import type { NextApiHandler } from "next";
import { Pool, DatabaseError } from "pg";

const pool = new Pool({
  connectionString: `postgres://postgres:postgres@localhost:5433/postgres`,
});

export interface Connection {
  error: string | null;
}
const connectionApi: NextApiHandler<Connection> = async (req, res) => {
  try {
    await Promise.all([
      pool.query("SELECT count(*) FROM thread"),
      pool.query("SELECT count(*) FROM post"),
    ]);
    res.status(200).json({ error: null });
  } catch (error) {
    res.status(200).json({ error: (error as DatabaseError).message });
  }
};

export default connectionApi;
