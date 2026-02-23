import { pgTable, uuid, varchar, integer, timestamp, jsonb, pgEnum, boolean, text } from 'drizzle-orm/pg-core';

export const purchaseStatusEnum = pgEnum('purchase_status', ['pending', 'completed', 'refunded']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
  credits: integer('credits').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  isBanned: boolean('is_banned').default(false).notNull(),
  bannedReason: text('banned_reason'),
});

export const purchases = pgTable('purchases', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  stripePaymentIntent: varchar('stripe_payment_intent', { length: 255 }).notNull(),
  amount: integer('amount').notNull(),
  status: purchaseStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voiceCredits = pgTable('voice_credits', {
  userId: uuid('user_id').primaryKey().references(() => users.id),
  credits: integer('credits').default(0).notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});

export const cardBoosterPacks = pgTable('card_booster_packs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  cards: jsonb('cards').notNull(),
  purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
});

export const adminLogs = pgTable('admin_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  adminUserId: uuid('admin_user_id'),
  action: text('action').notNull(),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const pageViews = pgTable('page_views', {
  id: uuid('id').defaultRandom().primaryKey(),
  path: text('path').notNull(),
  userId: uuid('user_id'),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
