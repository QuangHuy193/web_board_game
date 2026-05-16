import { toast } from "sonner";

export const showSuccess = (
  message: string
) => {
  toast.success(message, {
    style: {
      borderRadius: "18px",
    },
  });
};

export const showError = (
  message: string
) => {
  toast.error(message, {
    style: {
      borderRadius: "18px",
    },
  });
};

export const showInfo = (
  message: string
) => {
  toast(message, {
    style: {
      borderRadius: "18px",
    },
  });
};

export const showLoading = (
  message: string
) => {
  return toast.loading(message);
};