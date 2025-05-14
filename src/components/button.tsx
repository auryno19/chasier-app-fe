import { useEffect, useState } from "react";

interface ButtonProps {
  loading: boolean;
  onClick: (e: React.FormEvent) => void;
  value: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  type?: "primary" | "danger" | "warning";
  size?: "md" | "sm" | "xl";
}

const Button: React.FC<ButtonProps> = ({
  loading,
  onClick,
  value,
  type = "primary",
  size = "md",
  iconStart = null,
  iconEnd = null,
}) => {
  const [background, setBackground] = useState("");
  const [sizeButton, setSizeButton] = useState("");
  useEffect(() => {
    if (type == "primary") {
      setBackground("bg-sky-500");
    } else if (type == "danger") {
      setBackground("bg-red-500");
    } else if (type == "warning") {
      setBackground("bg-yellow-500");
    }
    if (size == "md") {
      setSizeButton("px-8 py-2");
    } else if (size == "sm") {
      setSizeButton("px-4 py-1 text-sm");
    } else if (size == "xl") {
      setSizeButton("px-10 py-3 text-xl");
    }
  }, [type, size]);

  return (
    // <div className={`${margin} w-full flex justify-center`}>
    <button
      className={`${sizeButton} ${background} shadow-md text-white rounded-md hover:opacity-75 transition-all duration-200 flex items-center`}
      onClick={onClick}
    >
      {iconStart}
      {loading ? (
        <span className="line-md--loading-loop"></span>
      ) : (
        <p>{value}</p>
      )}
      {iconEnd}
    </button>
    // </div>
  );
};

export default Button;
