import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

/**
 * Resolve a user by UUID or email.
 * If the user is not found but an email is provided, a new user record is
 * automatically created (upsert-on-first-contact) so that the coins system
 * works without a formal registration step.
 */
export async function resolveUser(userId?: string, email?: string) {
  if (userId) {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ?? null;
  }
  if (email) {
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) return existing;

    // Auto-register: create a new user record on first contact
    const [created] = await db
      .insert(users)
      .values({ email })
      .onConflictDoNothing()
      .returning();

    if (created) return created;

    // Race condition: another request inserted the row just before us
    const [retry] = await db.select().from(users).where(eq(users.email, email));
    return retry ?? null;
  }
  return null;
}
