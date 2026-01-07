/**
 * Usage Examples for useFormValidation Hook
 * 
 * This hook is generic and works with any Zod schema.
 */

import { useFormValidation } from "./useFormValidation";
import { authSchema, profileInfoSchema } from "../validationSchemas";

// ============================================
// Example 1: Auth Form (Login/SignUp)
// ============================================
export function AuthFormExample() {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    reset,
    isValid,
  } = useFormValidation({
    schema: authSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Form is valid, proceed with submission
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

// ============================================
// Example 2: Profile Info Form
// ============================================
export function ProfileInfoFormExample() {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    setFieldValue,
    reset,
  } = useFormValidation({
    schema: profileInfoSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "MALE" as const,
      dateOfBirth: new Date(),
      bio: "",
    },
    debounceMs: 500, // Custom debounce time
  });

  // Handle date input (needs special handling)
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : new Date();
    setFieldValue("dateOfBirth", date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Form is valid
    console.log("Profile data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <span>{errors.firstName}</span>}

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && <span>{errors.lastName}</span>}

      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      {errors.gender && <span>{errors.gender}</span>}

      <input
        type="date"
        onChange={handleDateChange}
        value={formData.dateOfBirth.toISOString().split("T")[0]}
      />
      {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
      />
      {errors.bio && <span>{errors.bio}</span>}

      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}

// ============================================
// Example 3: Custom Schema
// ============================================
import { z } from "zod";

const customSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().min(18, "Must be 18 or older"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

export function CustomFormExample() {
  const { formData, errors, handleChange, validateForm } = useFormValidation({
    schema: customSchema,
    initialValues: {
      username: "",
      age: 0,
      agreeToTerms: false,
    },
  });

  return (
    <form>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <span>{errors.username}</span>}

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      {errors.age && <span>{errors.age}</span>}

      <input
        type="checkbox"
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleChange}
      />
      {errors.agreeToTerms && <span>{errors.agreeToTerms}</span>}
    </form>
  );
}

