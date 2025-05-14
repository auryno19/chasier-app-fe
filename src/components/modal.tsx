"use client";
import { useTheme } from "@/app/context/themeContext";
import { useEffect, useState } from "react";

interface ModalProps {
  active: boolean;
  handleModal: () => void;
  children?: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  active,
  handleModal,
  title,
  children,
}) => {
  const [isActive, setIsActive] = useState(false);

  const theme = useTheme();
  useEffect(() => {
    setIsActive(active);
    theme?.setBackdrop(isActive);
    if (theme?.backdropClicked) {
      setTimeout(() => {
        theme?.setBackdropClicked(false);
      }, 100);
    }
  }, [isActive, theme, active]);
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[30rem] min-h-60 bg-slate-200 rounded-lg shadow-slate-700 shadow-lg z-50 flex flex-col text-slate-600 duration-300 transition-transform ${
        isActive
          ? theme?.backdropClicked
            ? "scale-95"
            : "scale-100"
          : "scale-0"
      }`}
    >
      <div
        className="absolute w-8 h-8 bg-red-500 -top-3 -right-3 rounded-full shadow-md ring-slate-200 ring-[3px] cursor-pointer hover:bg-red-700 transition-colors duration-200 text-slate-200 flex items-center justify-center"
        onClick={handleModal}
      >
        <span className="iconamoon--close-bold"></span>
      </div>
      <div className="w-full rounded-t-lg py-3 px-6 shadow-md">{title}</div>
      {children}
    </div>
  );
};

export default Modal;
