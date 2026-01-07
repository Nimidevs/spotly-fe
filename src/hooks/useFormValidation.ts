import { useEffect, useState, useCallback } from "react";
import { z } from "zod";

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormValidationOptions<T extends z.ZodObject<z.ZodRawShape>> {
  schema: T;
  initialValues: z.infer<T>;
  debounceMs?: number;
}

export function useFormValidation<T extends z.ZodObject<z.ZodRawShape>>({
  schema,
  initialValues,
  debounceMs = 400,
}: UseFormValidationOptions<T>) {
  type FormData = z.infer<T>;

  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitError, setSubmitError] = useState<string>("");

  // Generic field validation
  const validateField = useCallback(
    (fieldName: keyof FormData) => {
      // Clear existing error for this field
      setErrors((prev) => {
        const newErrors: FormErrors<FormData> = {};
        Object.keys(prev).forEach((key) => {
          if (key !== fieldName) {
            newErrors[key as keyof FormData] = prev[key as keyof FormData];
          }
        });
        return newErrors;
      });

      // Get the field schema from the main schema
      const shape = schema.shape as Record<string, z.ZodTypeAny>;
      const fieldSchema = shape[fieldName as string];
      if (!fieldSchema) return;

      // Validate the field value
      const result = fieldSchema.safeParse(formData[fieldName]);
      if (!result.success) {
        const message = result.error.issues[0]?.message ?? "Invalid value";
        setErrors((prev) => ({ ...prev, [fieldName]: message }));
      }
    },
    [schema, formData]
  );

  // Debounced validation effect for all touched fields
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    Object.keys(touched).forEach((field) => {
      if (touched[field as keyof FormData]) {
        const timeoutId = setTimeout(() => {
          validateField(field as keyof FormData);
        }, debounceMs);
        timeouts.push(timeoutId);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [formData, touched, validateField, debounceMs]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof FormData;

    // Handle different input types
    let processedValue: unknown = value;
    if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    } else if (type === "date") {
      processedValue = value ? new Date(value) : null;
    } else if (type === "number") {
      processedValue = value ? Number(value) : null;
    }

    setFormData((prev) => {
      const updated = { ...prev } as Record<string, unknown>;
      updated[fieldName as string] = processedValue;
      return updated as FormData;
    });
    setTouched((prev) => {
      const updated = { ...prev } as Record<string, boolean>;
      updated[fieldName as string] = true;
      return updated as Partial<Record<keyof FormData, boolean>>;
    });
  };

  const validateForm = useCallback((): boolean => {
    // Clear all field errors
    setErrors({});
    setSubmitError("");

    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: FormErrors<FormData> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (field) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    return true;
  }, [schema, formData]);

  const reset = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError("");
  }, [initialValues]);

  const setFieldValue = useCallback((fieldName: keyof FormData, value: unknown) => {
    setFormData((prev) => {
      const updated = { ...prev } as Record<string, unknown>;
      updated[fieldName as string] = value;
      return updated as FormData;
    });
    setTouched((prev) => {
      const updated = { ...prev } as Record<string, boolean>;
      updated[fieldName as string] = true;
      return updated as Partial<Record<keyof FormData, boolean>>;
    });
  }, []);

  const setFieldError = useCallback((fieldName: keyof FormData, error: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }, []);

  return {
    formData,
    setFormData,
    errors,
    touched,
    submitError,
    setSubmitError,
    handleChange,
    validateForm,
    validateField,
    reset,
    setFieldValue,
    setFieldError,
    isValid: Object.keys(errors).length === 0 && !submitError,
  };
}

