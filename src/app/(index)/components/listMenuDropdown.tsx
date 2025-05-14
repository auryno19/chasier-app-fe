import { useEffect, useState } from "react";
import ListMenu from "./listMenu";

interface ListMenuDropDownProp {
  menu: string;
  isOpen: boolean;
  icon: string;
}

const ListMenuDropDown: React.FC<ListMenuDropDownProp> = ({
  menu,
  isOpen,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };
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
    <>
      <div
        className="w-full h-8 group hover:bg-slate-600 rounded-md flex items-center px-1 gap-2 mb-2 cursor-pointer transition-colors duration-300"
        onClick={handleToggle}
      >
        <span
          className={`${icon} text-slate-600 group-hover:text-sky-50 transition-colors duration-300`}
        ></span>
        <div
          className={`overflow-hidden delay-100 transition-all duration-300 flex items-center justify-between ${
            isOpen ? "w-[100%]" : "w-[0%]"
          } ${!isVisible && "hidden"}`}
        >
          <p
            className={`text-slate-600 group-hover:text-sky-50 transition-colors duration-300 `}
          >
            {menu}
          </p>
          <div className="text-slate-600 group-hover:text-sky-50 transition-colors duration-300 translate-y-1">
            <span
              className={`mynaui--chevron-up-solid transition-all duration-500 ${
                !isToggleOpen && "scale-y-[-1]"
              }`}
            ></span>
          </div>
        </div>
      </div>
      <div
        className={`w-full overflow-hidden bg-slate-400 shadow-inner shadow-slate-500 rounded-lg  transition-all duration-300 ${
          !isToggleOpen ? "h-[0px] p-0" : `h-[136px] pt-2 pb-1`
        }`}
      >
        <ListMenu
          menu="Dasboard"
          isOpen={isOpen}
          link="/dashboard"
          padding="px-2"
          icon="mage--dashboard-3-fill"
        />
        <ListMenu
          menu="Dasboard"
          isOpen={isOpen}
          link="/dashboard"
          padding="px-2"
          icon="mage--dashboard-3-fill"
        />
        <ListMenu
          menu="Dasboard"
          isOpen={isOpen}
          link="/dashboard"
          padding="px-2"
          icon="mage--dashboard-3-fill"
        />
      </div>
    </>
  );
};

export default ListMenuDropDown;
