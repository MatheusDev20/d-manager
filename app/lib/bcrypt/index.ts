// src/lib/bcryptUtils.ts

import bcrypt from "bcrypt";

/**
 * The salt rounds (cost factor) used by bcrypt.
 * Ensure that you have defined BCRYPT_SALT in your .env file as a number (e.g., 10 or 12).
 */
const saltRounds = process.env.BCRYPT_SALT
  ? parseInt(process.env.BCRYPT_SALT, 10)
  : 10;

/**
 * Hashes (encrypts) a plain text password using bcrypt.
 * @param password - The plain text password to be hashed.
 * @returns A Promise that resolves to the hashed password.
 */
export async function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verifies that the provided plain text password matches the given bcrypt hash.
 * @param password - The plain text password to verify.
 * @param hash - The hashed password to compare against.
 * @returns A Promise that resolves to true if the password is correct; false otherwise.
 */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
