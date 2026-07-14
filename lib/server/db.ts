import { promises as fs } from "fs";
import path from "path";
import { createHash, randomUUID } from "crypto";
import type { Division, Judge, User } from "@/lib/types";

type Database = {
  users: User[];
};

type JudgeInput = {
  name: string;
  email: string;
  password?: string;
  organization: string;
  position: string;
  phone: string;
  division: Division | "all";
  isActive: boolean;
};

const dbPath = path.join(process.cwd(), "data", "db.json");

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

async function readDb(): Promise<Database> {
  const raw = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(raw.replace(/^\uFEFF/, "")) as Database;
}

async function writeDb(db: Database) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

function publicUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function authenticateUser(email: string, password: string, role?: User["role"]) {
  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user || !user.isActive) return null;
  if (role && user.role !== role) return null;
  if (user.passwordHash !== hashPassword(password)) return null;

  user.lastSeen = new Date().toISOString().slice(0, 16).replace("T", " ");
  user.updatedAt = new Date().toISOString();
  await writeDb(db);

  return publicUser(user);
}

export async function listJudges(): Promise<Judge[]> {
  const db = await readDb();
  return db.users
    .filter((user) => user.role === "judge")
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.organization,
      position: user.position,
      phone: user.phone,
      division: user.division,
      isActive: user.isActive,
      lastSeen: user.lastSeen
    }));
}

export async function createJudge(input: JudgeInput) {
  const db = await readDb();
  if (db.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("이미 등록된 이메일입니다.");
  }

  const now = new Date().toISOString();
  const user: User = {
    id: `j-${randomUUID()}`,
    email: input.email,
    passwordHash: hashPassword(input.password || "Temp@2026!"),
    name: input.name,
    role: "judge",
    organization: input.organization,
    position: input.position,
    phone: input.phone,
    division: input.division,
    isActive: input.isActive,
    lastSeen: "-",
    createdAt: now,
    updatedAt: now
  };

  db.users.push(user);
  await writeDb(db);
  return publicUser(user);
}

export async function updateJudge(id: string, input: JudgeInput) {
  const db = await readDb();
  const user = db.users.find((item) => item.id === id && item.role === "judge");
  if (!user) return null;
  const duplicate = db.users.find((item) => item.id !== id && item.email.toLowerCase() === input.email.toLowerCase());
  if (duplicate) throw new Error("이미 등록된 이메일입니다.");

  user.name = input.name;
  user.email = input.email;
  user.organization = input.organization;
  user.position = input.position;
  user.phone = input.phone;
  user.division = input.division;
  user.isActive = input.isActive;
  user.updatedAt = new Date().toISOString();
  if (input.password) {
    user.passwordHash = hashPassword(input.password);
  }

  await writeDb(db);
  return publicUser(user);
}
