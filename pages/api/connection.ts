import type { NextApiRequest, NextApiResponse } from "next";
import { Pool, DatabaseError } from "pg";

const pool = new Pool({
  connectionString: `postgres://postgres:postgres@localhost:5433/postgres`,
});

export interface Connection {
  error: string | null;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Connection>
) => {
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
