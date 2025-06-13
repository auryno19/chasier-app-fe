"use client";

import Image from "next/image";
import ListMenu from "./listMenu";
import { useEffect, useState } from "react";
import ListMenuDropDown from "./listMenuDropdown";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
      setIsVisible(true);
    } else {
      setIsOpen(false);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`relative bg-sky-50 h-[96vh] rounded-lg shadow-lg py-4 transition-all duration-300 ${
        isOpen ? "w-[16%] px-3" : "w-[40px] px-1"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full shadow-md bg-slate-500 absolute z-20 -right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer ${
          !isVisible && "hidden"
        }`}
        onClick={handleToggle}
      >
        <span
          className={`eva--chevron-left-fill transition-all duration-500 ${
            !isOpen && "scale-x-[-1]"
          }`}
        ></span>
      </div>
      <div className="relative w-full h-5 mt-2">
        <Image
          src={`${isOpen ? "/next.svg" : "/next-sm.svg"}`}
          layout="fill"
          objectFit="contain"
          alt="Fufa Store Logo"
          className="w-0"
        />
      </div>
      <div className="flex w-full justify-center">
        <hr className=" w-[80%] items-center my-3 border-slate-600 opacity-75" />
      </div>

      <ListMenu
        menu="Dashboard"
        isOpen={isOpen}
        link="/"
        padding=""
        icon="mage--dashboard-3-fill"
      />
      <ListMenu
        menu="Category"
        isOpen={isOpen}
        link="/category"
        padding=""
        icon="iconamoon--category-bold"
      />
      <ListMenu
        menu="Product"
        isOpen={isOpen}
        link="/product"
        padding=""
        icon="streamline--production-belt-solid"
      />
      <ListMenuDropDown
        menu="Dropdown"
        isOpen={isOpen}
        icon="tdesign--component-dropdown-filled"
      />
    </div>
  );
};

export default Sidebar;
