"use client";

import Toast from "@/components/toast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ToastStatus = "error" | "success" | "warning";

interface ToastState {
  status: ToastStatus;
  header: string;
  message: string;
  active: boolean;
}

interface ToastContextType {
  showToast: (status: ToastStatus, header: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    status: "success",
    header: "",
    message: "",
    active: false,
  });

  const showToast = (status: ToastStatus, header: string, message: string) => {
    setToast({ status, header, message, active: true });
  };

  useEffect(() => {
    if (toast.active) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, active: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.active]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
