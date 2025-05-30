import { useEffect, useState } from "react";

interface ToastProps {
  status: "error" | "success" | "warning";
  header: string;
  message: string;
  active: boolean;
}
const Toast: React.FC<ToastProps> = ({ status, header, message, active }) => {
  const [isActive, setIsActive] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (status === "error") {
      setBgColor("bg-red-400");
      setIcon("flowbite--close-circle-solid");
    } else if (status === "success") {
      setBgColor("bg-green-400");
      setIcon("flowbite--check-circle-solid");
    } else if (status === "warning") {
      setBgColor("bg-yellow-500");
      setIcon("flowbite--exclamation-circle-solid");
    }
    if (active) {
      setDisplay(true);
      setIsActive(true);
      setLoading(true);

      const loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      const hideTimeout = setTimeout(() => {
        setIsActive(false);
        const displayTimeout = setTimeout(() => {
          setDisplay(false);
        }, 500);
        return () => clearTimeout(displayTimeout);
      }, 3000);
      return () => {
        clearTimeout(loadingTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [status, active]);

  return display ? (
    <div
      className={`absolute top-4 right-5 ${bgColor} rounded-md text-white shadow-md transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className=" pl-4 pr-6 py-3 flex flex-row gap-4 items-center">
        <span className={icon}></span>
        <div>
          <p className="text-lg font-semibold">{header}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <div
        className={`w-full rounded-b-md h-1 bg-slate-200 transition-all duration-[2000ms] ease-in origin-left ${
          loading ? "scale-100" : "scale-0"
        }`}
      ></div>
    </div>
  ) : null;
};

export default Toast;
