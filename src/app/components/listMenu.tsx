"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ListMenuProp {
  menu: string;
  isOpen: boolean | true;
  link: string;
  padding: string | "";
  icon: string;
}

const ListMenu: React.FC<ListMenuProp> = ({
  menu,
  isOpen,
  link,
  padding,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [isOpen]);
  return (
    <Link href={link}>
      <div
        className={`w-full h-8 group hover:bg-slate-600 rounded-md flex items-center px-1 gap-2 mb-2 cursor-pointer transition-colors duration-300 ${padding}`}
      >
        <span
          className={`${icon} text-slate-600 group-hover:text-sky-50 transition-colors duration-300`}
        ></span>
        <div
          className={`overflow-hidden delay-100 transition-all duration-300 ${
            isOpen ? "w-[100%]" : "w-[0%]"
          } ${!isVisible && "hidden"}`}
        >
          <p
            className={`text-slate-600 group-hover:text-sky-50 transition-colors duration-300 `}
          >
            {menu}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListMenu;
