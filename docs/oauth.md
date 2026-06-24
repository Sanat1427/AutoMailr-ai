# OAuth Authentication Documentation

# Overview

AutoMailr AI uses OAuth-based authentication to allow users to securely sign in using their existing accounts without creating a separate username and password.

OAuth enables users to authenticate through trusted identity providers such as:

* Google
* GitHub
* Microsoft
* Facebook

Currently, Google OAuth is used as the primary authentication method.

---

# What is OAuth?

OAuth (Open Authorization) is an industry-standard protocol that allows applications to access user information from a third-party provider without requiring the user's password.

Instead of sharing passwords with AutoMailr AI, users authenticate directly with Google.

Benefits:

* Improved security
* Better user experience
* Faster onboarding
* Reduced password management

---

# Why OAuth?

Traditional Authentication:

User
↓
Email
Password
↓
Database

Problems:

* Password storage risks
* Password resets
* Credential management

OAuth Authentication:

User
↓
Google Login
↓
Google Verification
↓
AutoMailr AI

Benefits:

* No password storage
* More secure
* Trusted authentication provider
* Faster login process

---

# Authentication Architecture

```text
User
 ↓
Login Button
 ↓
Google OAuth
 ↓
Google Authentication
 ↓
Authorization Code
 ↓
Application Backend
 ↓
User Session Created
 ↓
Dashboard Access
```

---

# OAuth Flow

The authentication process follows several steps.

## Step 1: User Clicks Sign In

The user selects:

```text
Continue with Google
```

---

## Step 2: Redirect to Google

The application redirects the user to Google's authentication page.

Google handles:

* Email verification
* Password verification
* Multi-factor authentication

---

## Step 3: User Grants Permission

Google asks the user to authorize the application.

Example Permissions:

* Profile Information
* Email Address

---

## Step 4: Authorization Code Returned

After successful login, Google sends an authorization code to the application.

```text
Google
 ↓
Authorization Code
 ↓
AutoMailr AI
```

---

## Step 5: Token Exchange

The backend exchanges the authorization code for:

* Access Token
* ID Token

These tokens prove that the user has been authenticated.

---

## Step 6: User Information Retrieval

The application retrieves:

```json
{
  "name": "Sanat Kumar",
  "email": "sanat@example.com",
  "picture": "profile-image-url"
}
```

---

## Step 7: User Record Creation

If the user is new:

```text
User Not Found
 ↓
Create User
 ↓
Store Information
```

If the user already exists:

```text
User Found
 ↓
Login Success
```

---

# User Database Structure

Authenticated users are stored in Convex.

Example Schema:

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
  "email": "sanat@example.com",
  "image": "https://..."
}
```

---

# Session Management

After authentication, a session is created.

Purpose:

* Keep user logged in
* Identify user requests
* Protect user data

Session Flow:

```text
Login
 ↓
Session Created
 ↓
User Requests
 ↓
Session Validation
 ↓
Authorized Access
```

---

# Protected Resources

Only authenticated users can access:

* Dashboard
* Email Templates
* Saved Campaigns
* AI Email Generation
* Email Delivery Features

---

# Ownership Model

Each template belongs to a specific user.

```text
User
 ↓
User ID
 ↓
Templates
```

This ensures users only access their own data.

Example:

```json
{
  "userId": "abc123",
  "templateName": "Welcome Email"
}
```

---

# Security Benefits

OAuth provides several security advantages.

## No Password Storage

The application never stores user passwords.

## Trusted Identity Provider

Google manages authentication.

## Reduced Security Risks

No password leaks from the application database.

## Multi-Factor Authentication Support

Users automatically benefit from Google's MFA security.

---

# Authentication Middleware

Protected routes verify authentication before granting access.

Workflow:

```text
Request
 ↓
Check Session
 ↓
Authenticated?
 ↓
Yes → Continue
No → Redirect to Login
```

---

# Common Authentication Scenarios

## First Login

User logs in using Google.

Application creates a new user record.

---

## Returning User

User logs in again.

Existing user record is retrieved.

---

## Session Expired

User is redirected to the login page.

---

# Error Handling

Common OAuth errors:

## User Cancels Login

Authentication process is stopped.

## Invalid Token

User must log in again.

## Expired Session

New authentication is required.

## Provider Unavailable

Application displays authentication error.

---

# Future Enhancements

Planned authentication improvements:

* GitHub OAuth
* Microsoft OAuth
* Multi-provider login
* Role-Based Access Control (RBAC)
* Team Workspaces
* Organization Accounts
* Admin Dashboard

---

# Interview Questions

## Why OAuth instead of Password Authentication?

OAuth is more secure because passwords are handled by trusted providers like Google, reducing security risks and simplifying user management.

---

## What information do you receive from Google?

Typically:

* Name
* Email
* Profile Picture

---

## Does AutoMailr AI store user passwords?

No.

Passwords remain with Google.

The application only stores user profile information and authentication tokens.

---

## How are user templates protected?

Each template is linked to a specific user ID, and authorization checks ensure users can only access their own templates.

---

# Conclusion

OAuth provides a secure, scalable, and user-friendly authentication system for AutoMailr AI. By leveraging Google's authentication infrastructure, the platform eliminates password management complexity while maintaining strong security and a seamless login experience.
