import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface ValidationOptions {
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: (errors: Record<string, any>) => void;
}

export const useFormValidator = () => {
  const validateForm = (
    form: UseFormReturn<any>,
    options: ValidationOptions = {}
  ) => {
    const { showToast = true, onSuccess, onError } = options;
    const values = form.watch();
    const errors = form.formState.errors;

    // Log current form state
    console.log("Current Form Values:", values);

    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);

      if (showToast) {
        toast.error("Zod validation failed, check your console logs");
      }

      onError?.(errors);
      return false;
    }

    console.log("No validation errors");
    onSuccess?.();
    return true;
  };

  return { validateForm };
};

// Helper untuk mengecek apakah form valid sebelum submit
export const withFormValidation = (
  form: UseFormReturn<any>,
  onSubmit: (data: any) => void,
  options?: ValidationOptions
) => {
  const { validateForm } = useFormValidator();

  return () => {
    if (validateForm(form, options)) {
      form.handleSubmit(onSubmit)();
    }
  };
};
