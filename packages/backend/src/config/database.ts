import { Collection, Database } from "@colyseus/database";

export interface User extends Collection {
  name: string;
  email: string;
  password: string;
  discord_id: string;
  locale: string;
  anonymous: boolean;
}

export interface MonthlyScore extends Collection {
  user_id: number;
  score: number;
}

export const db = new Database<{
  users: User,
  monthly_scores: MonthlyScore,
}>({
  log: ['error', 'query'],
});

export const User = db.collection("users");
export const MonthlyScore = db.collection("monthly_scores");

export default db;