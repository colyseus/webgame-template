import { Collection, Database } from "@colyseus/database";

interface User extends Collection {
  name: string;
  email: string;
  discord_id: string;
  locale: string;
}

export const db = new Database<{
  users: User
}>();

export const User = db.collection("users");

