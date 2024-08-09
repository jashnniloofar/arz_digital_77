import { genSalt, hash } from 'bcryptjs';

/**
 * Hash password for store in database
 * @param secret password or secret
 * @returns hashed secret & salt
 */
export const hashSecret = async (
  secret: string,
  salt?: string,
): Promise<{ hashed: string; salt: string }> => {
  salt = salt ? salt : await genSalt();
  const hashed = await hash(secret, salt);
  return { hashed, salt };
};
