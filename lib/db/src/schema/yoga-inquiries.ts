import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const yogaInquiriesTable = pgTable("yoga_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  eventType: text("event_type"),
  groupSize: text("group_size"),
  eventDate: text("event_date"),
  location: text("location"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertYogaInquirySchema = createInsertSchema(yogaInquiriesTable).omit({ id: true, createdAt: true, status: true });
export type InsertYogaInquiry = z.infer<typeof insertYogaInquirySchema>;
export type YogaInquiry = typeof yogaInquiriesTable.$inferSelect;
