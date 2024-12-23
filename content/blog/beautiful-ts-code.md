---
draft: false
title: Best Practices for TypeScript Imports
date: 2024-12-22T04:00:00.000Z
minRead: 4
author: content/authors/logan_anderson.md
description: >-
  Learn how to write cleaner, more maintainable TypeScript code with better
  import practices
tags:
  - typescript
  - code
  - best-practices
---

When working with TypeScript projects, especially larger ones, how you structure your imports can significantly impact your code's maintainability and readability. Let's explore some best practices for managing imports in TypeScript.

## The Problem with Relative Paths

You've probably seen imports that look like this:

```typescript
import { UserProfile } from "../../../components/UserProfile";
import { AuthContext } from "../../../../contexts/AuthContext";
```

These relative imports have several issues:

1. They're fragile - moving files breaks imports
2. They're hard to read and understand
3. They create tight coupling between file locations
4. They're difficult to refactor

## Using Absolute Paths

Instead, configure your project to use absolute paths. This approach is cleaner and more maintainable:

```typescript
import { UserProfile } from "~/components/UserProfile";
import { AuthContext } from "~/contexts/AuthContext";
```

### How to Set Up Absolute Imports

1. Configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

1. If using Next.js, it automatically supports the `@/*` prefix. For other frameworks, you might need additional configuration.

## Benefits of Absolute Imports

1. **Clarity**: The import path clearly shows where the module lives in your project structure
2. **Maintainability**: Moving files around doesn't break import paths
3. **Consistency**: Team members can quickly understand the project structure
4. **Refactoring**: IDEs handle absolute imports better for automated refactoring

## Additional Import Best Practices

### Group and Order Imports

Organize your imports into groups:

```typescript
// External dependencies
import React from "react";
import { motion } from "framer-motion";

// Internal absolute imports
import { Button } from "~/components/Button";
import { useAuth } from "~/hooks/useAuth";

// Types and interfaces
import type { User } from "~/types";
```

### Use Named Exports

Prefer named exports over default exports for better refactoring support and explicit imports:

```typescript
// ✅ Good
export const Button = () => {
  /* ... */
};

// ❌ Avoid
export default Button;
```

### Import Types Explicitly

When importing types, use the `type` keyword to make it clear you're importing a type:

```typescript
import type { User } from "~/types";
```

## Conclusion

Clean import statements might seem like a small detail, but they can significantly impact your codebase's maintainability. By following these practices, you'll create more robust and maintainable TypeScript applications.

Remember:

* Use absolute imports with a prefix like `~/*` or `@/*`
* Group and order your imports consistently
* Be explicit with type imports
* Prefer named exports over default exports

These small changes will make your TypeScript code more professional and easier to maintain in the long run.
