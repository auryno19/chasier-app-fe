"use client";

import React, { useState } from "react";
import ListMenu from "./listMenu";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      <p className="font-semibold mr-3">Admin</p>
      <div className="relative">
        <div
          className="relative w-8 h-8 bg-slate-500 rounded-full cursor-pointer"
          onClick={handleToggle}
        ></div>
        <div
          className={`absolute w-36 pt-2 opacity-100 bg-white shadow-xl rounded-lg right-5 top-[35px] transition-transform origin-top-right ${
            !isOpen ? "scale-0" : "scale-100"
          }`}
        >
          <ListMenu
            menu="Profile"
            link="/dashboard"
            isOpen={true}
            padding="px-4"
            icon="iconamoon--profile-fill"
          />
          <ListMenu
            menu="Logout"
            link="/dashboard"
            isOpen={true}
            padding="px-4"
            icon="majesticons--logout"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
