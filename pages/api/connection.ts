import type { NextApiRequest, NextApiResponse } from "next";
import { Pool, DatabaseError } from "pg";

const pool = new Pool({
  connectionString: `postgres://postgres:postgres@localhost:5432/postgres`,
});

export interface Connection {
  error: string | null;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Connection>
) => {
  try {
    await pool.query("SELECT NOW()");
    res.status(200).json({ error: null });
  } catch (error) {
    res.status(200).json({ error: (error as DatabaseError).message });
  }
};
