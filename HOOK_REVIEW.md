# useAuthValidator Hook Review

## Current Issues

### 1. **Syntax Error** ❌
```typescript
// Line 59 - Missing opening brace
const validateForm = () => {  // ← Missing this
    setError((prev) => ({ ...prev, email: "", password: "" }));
    // ...
}
```

### 2. **Not Reusable** ❌
- Hardcoded to `email` and `password` fields
- Can't be used for ProfileInfo form or other forms
- Would need to create separate hooks for each form type

### 3. **Schema Validation Issue** ❌
```typescript
// In validationSchemas.ts
email: z.email("Invalid email address"),  // ❌ z.email() doesn't exist
// Should be:
email: z.string().email("Invalid email address"),
```

### 4. **Missing Features** ⚠️
- No `reset()` function to clear form
- No `setFormData` exposed (can't update from outside)
- No TypeScript return types
- No way to handle submit errors separately

## Better Approach: Generic Form Validation Hook

### Option 1: Generic Hook (Recommended)
```typescript
// hooks/useFormValidation.ts
import { useEffect, useState } from "react";
import { z } from "zod";

export function useFormValidation<T extends z.ZodTypeAny>(
  schema: T,
  initialValues: z.infer<T>
) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Generic field validation
  const validateField = (fieldName: string) => {
    const fieldSchema = schema.shape[fieldName];
    if (!fieldSchema) return;

    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    const result = fieldSchema.safeParse(formData[fieldName]);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid value";
      setErrors((prev) => ({ ...prev, [fieldName]: message }));
    }
  };

  // Debounced validation effect
  useEffect(() => {
    Object.keys(touched).forEach((field) => {
      if (touched[field]) {
        const timeoutId = setTimeout(() => validateField(field), 400);
        return () => clearTimeout(timeoutId);
      }
    });
  }, [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    setFormData,
    errors,
    touched,
    handleChange,
    validateForm,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
```

### Usage Example:
```typescript
// In SignUp component
const { formData, errors, handleChange, validateForm } = useFormValidation(
  authSchema,
  { email: "", password: "" }
);
```

## Option 2: Keep Current Approach But Fix Issues

If you want to keep it simple and auth-specific:

1. **Fix syntax error**
2. **Fix schema validation**
3. **Add missing features** (reset, setFormData)
4. **Add TypeScript types**

## Recommendation

**For your current needs**: Fix the syntax error and schema issue, but keep it as-is if you only need it for auth forms.

**For scalability**: Create a generic `useFormValidation` hook that can work with any Zod schema. This way you can use it for:
- Auth forms (email/password)
- ProfileInfo form
- Any future forms

The generic approach is more maintainable and follows DRY principles.

