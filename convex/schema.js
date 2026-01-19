import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
  }),
  emailTemplates: defineTable({
    tid: v.string(),
    design: v.any(),
    description: v.any(),   // ✅ FIXED SPELLING
    email: v.string(),
  }),
});
