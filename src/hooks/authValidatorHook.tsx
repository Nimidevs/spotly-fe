import { useEffect, useState } from "react";
import { authSchema } from "../validationSchemas";


export const useAuthValidator = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const [error, setError] = useState({
        email: "",
        password: "",
        submitError: "",
      });

      const [touched, setTouched] = useState({
        email: false,
        password: false,
      });

      useEffect(() => {
        if (!touched.email) return;
        const id = setTimeout(() => validateField("email"), 400);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData.email, touched.email]);

      // Debounced password validation
      useEffect(() => {
        if (!touched.password) return;
        const id = setTimeout(() => validateField("password"), 400);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData.password, touched.password]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
      };


      const validateField = (field: "email" | "password") => {
        // clear existing error for this field
        setError((prev) => ({ ...prev, [field]: "" }));
    
        const schema = authSchema.shape[field];
        if (!schema) return;
    
        const result = schema.safeParse(formData[field]);
        if (!result.success) {
          const message = result.error.issues[0]?.message ?? "Invalid value";
          setError((prev) => ({ ...prev, [field]: message }));
        }
      };


      const validateForm = () => {
        setError((prev) => ({ ...prev, email: "", password: "" }));
        const result = authSchema.safeParse(formData);
        if (!result.success) {
          const nextErrors = { email: "", password: "", submitError: "" };
          result.error.issues.forEach((issue) => {
            const field = issue.path[0];
            if (field === "email" || field === "password") {
              nextErrors[field] = issue.message;
            }
          });
          setError((prev) => ({ ...prev, ...nextErrors }));
          return false;
        }
        return true;
      }

      return {
        formData,
        error,
        handleChange,
        validateForm
      }

}