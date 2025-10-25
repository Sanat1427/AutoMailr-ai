import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
        description: args.description,
      });
      return result;
    } catch (e) {
      return {};
    }
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) =>
        q.and(
          q.eq(q.field("tid"), args.tid),
          q.eq(q.field("email"), args.email)
        )
      )
      .collect();
    return result;
  },
});

export const UpdateTemplatelDesign = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    // ✅ Safe guard to avoid reading _id from undefined
    if (!result || result.length === 0) {
      console.error(`No template found for tid: ${args.tid}`);
      return { error: "Template not found" };
    }

    const docId = result[0]._id;
    console.log("Updating template:", docId);

    await ctx.db.patch(docId, {
      design: args.design,
    });

    return { success: true };
  },
});

export const GetAllUserTemplate = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});
export const DeleteTemplate = mutation({
  args: { tid: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    if (!result || result.length === 0) {
      console.error(`No template found for tid: ${args.tid}`);
      return { error: "Template not found" };
    }

    const docId = result[0]._id;
    await ctx.db.delete(docId);
    return { success: true };
  },
});
