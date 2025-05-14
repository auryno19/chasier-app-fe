"use client";
import { useTheme } from "@/app/context/themeContext";
import { useEffect, useState } from "react";

const Backdrop: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isOppacityStart, setIsOpacityStart] = useState(false);
  const { backdrop } = useTheme() ?? { backdrop: true };
  const theme = useTheme();
  useEffect(() => {
    if (backdrop) {
      setIsHidden(false);
      setTimeout(() => {
        setIsOpacityStart(true);
      }, 150);
    } else {
      setIsOpacityStart(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 500);
    }
  }, [backdrop]);
  return (
    <div
      id="backdrop"
      className={`absolute w-[100vw] h-[100vh] bg-slate-800/40 top-0 left-0 z-40 backdrop-filter backdrop-blur-[5px] transition-opacity duration-500  ${
        isOppacityStart ? "opacity-100" : "opacity-0"
      } ${isHidden ? "hidden" : ""}`}
      onClick={() => theme?.setBackdropClicked(true)}
    ></div>
  );
};

export default Backdrop;
