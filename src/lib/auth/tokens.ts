import { createHash, randomBytes, randomInt } from "crypto";
import bcrypt from "bcryptjs";

export function hashValue(value: string): string {
  const pepper = process.env.JWT_SECRET || "alh-auth";
  return createHash("sha256").update(`${pepper}:${value}`).digest("hex");
}

export function createToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

export function createOtp(length = 6): string {
  const max = 10 ** length;
  return randomInt(0, max).toString().padStart(length, "0");
}

export async function hashBackupCode(code: string): Promise<string> {
  return bcrypt.hash(code, 10);
}

export async function verifyBackupCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash);
}

export function createBackupCodes(count = 8): string[] {
  return Array.from({ length: count }, () =>
    randomBytes(5).toString("hex").slice(0, 10).toUpperCase()
  );
}

export function appUrl(): string {
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}
