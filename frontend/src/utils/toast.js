import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showErrorToast = (errorMessage, theme) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme
  });
};

export const showSuccessToast = (successMessage, theme) => {
  toast.success(successMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme
  });
};

export const showLoadingToast = (loadingMessage = "Loading...", theme) => {
  const toastId = toast.loading(loadingMessage, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme
  });
  return toastId;
};

//   const toastId = showLoadingToast();

// // Simulate some asynchronous operation
// setTimeout(() => {
//   toast.dismiss(toastId); // Close the toast after some time
// }, 2000);
