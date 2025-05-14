"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ThemeContextType {
  backdrop: boolean | false;
  backdropClicked: boolean | false;
  setBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  setBackdropClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [backdrop, setBackdrop] = useState(false);
  const [backdropClicked, setBackdropClicked] = useState(false);

  return (
    <ThemeContext.Provider
      value={{ backdrop, setBackdrop, backdropClicked, setBackdropClicked }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
