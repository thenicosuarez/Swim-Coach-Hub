import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { clientsTable } from "./clients";

export const coachingPlansTable = pgTable("coaching_plans", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clientsTable.id),
  title: text("title").notNull(),
  goal: text("goal"),
  drills: text("drills"),
  notes: text("notes"),
  shareToken: text("share_token").notNull().unique(),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCoachingPlanSchema = createInsertSchema(coachingPlansTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCoachingPlan = z.infer<typeof insertCoachingPlanSchema>;
export type CoachingPlan = typeof coachingPlansTable.$inferSelect;
