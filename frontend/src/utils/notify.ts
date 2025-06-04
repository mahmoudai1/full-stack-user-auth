import { toast } from "react-toastify";

const notifyError = (err: Error) => {
  const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
  toast.error(errorMessage);
};

const notifySuccess = (message: string) => {
  toast.success(message);
}

export { notifyError, notifySuccess };