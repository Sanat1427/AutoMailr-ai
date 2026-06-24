# Convex Integration Documentation

# Overview

AutoMailr AI uses Convex as its primary backend database and real-time synchronization service.

Convex simplifies backend development by providing:

* Database storage
* Real-time updates
* Queries
* Mutations
* Authentication integration
* Serverless infrastructure

Unlike traditional architectures that require Express.js and MongoDB, Convex combines backend logic and database functionality into a single platform.

---

# Why Convex?

Traditional Stack:

Frontend
↓
Express Server
↓
MongoDB

AutoMailr AI Stack:

Frontend
↓
Convex
(Database + Backend)

Benefits:

* Less backend boilerplate
* Real-time synchronization
* Serverless deployment
* Faster development
* Built-in query system

---

# Role of Convex in AutoMailr AI

Convex is responsible for:

* User management
* Email template storage
* Template retrieval
* Template updates
* Real-time synchronization

---

# Database Collections

## Users

Stores authenticated user information.

Schema:

```typescript
{
  name: string;
  email: string;
  image: string;
}
```

Example:

```json
{
  "name": "Sanat Kumar",
  "email": "sanat@gmail.com"
}
```

---

## Email Templates

Stores generated and edited email templates.

Schema:

```typescript
{
  userId: string;
  templateName: string;
  design: object;
  createdAt: number;
  updatedAt: number;
}
```

Example:

```json
{
  "templateName": "Welcome Campaign",
  "design": {}
}
```

---

# Queries

Queries are used to fetch data.

Example Use Cases:

* Get current user
* Get user templates
* Get template by ID

Example:

```typescript
export const getTemplates = query({
  handler: async (ctx) => {
    return await ctx.db.query("templates").collect();
  }
});
```

---

# Mutations

Mutations are used to create, update, or delete data.

Example Use Cases:

* Save template
* Update template
* Delete template

Example:

```typescript
export const createTemplate = mutation({
  handler: async (ctx, args) => {
    return await ctx.db.insert("templates", args);
  }
});
```

---

# Template Save Workflow

User
↓
Editor
↓
Convex Mutation
↓
Database
↓
Success Response

---

# Real-Time Synchronization

One of Convex's strongest features is automatic synchronization.

Workflow:

Database Update
↓
Convex Subscription
↓
Frontend Update

Benefits:

* No manual refresh
* Instant updates
* Better user experience

---

# Security Considerations

* User ownership validation
* Input validation
* Authentication checks
* Protected database operations

---

# Advantages

* Real-time database
* Serverless backend
* Easy integration with Next.js
* Reduced development complexity
* Scalable architecture

---

# Future Improvements

* Team workspaces
* Shared templates
* Template versioning
* Analytics storage
* Campaign management

---

# Conclusion

Convex serves as the backend foundation of AutoMailr AI by providing database storage, real-time synchronization, and scalable serverless infrastructure. Its integration reduces backend complexity while enabling a responsive and modern user experience.
