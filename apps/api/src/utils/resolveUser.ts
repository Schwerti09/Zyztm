import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

export async function resolveUser(userId?: string, email?: string) {
  if (userId) {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ?? null;
  }
  if (email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user ?? null;
  }
  return null;
}
