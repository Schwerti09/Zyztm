import { pgTable, uuid, varchar, integer, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const purchaseStatusEnum = pgEnum('purchase_status', ['pending', 'completed', 'refunded']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
  credits: integer('credits').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
