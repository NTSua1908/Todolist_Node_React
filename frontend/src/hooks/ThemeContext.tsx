import { ReactNode, createContext, useContext, useState } from "react";
import ThemeName from "../enums/Theme";

interface Theme {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<Theme>({
  theme: ThemeName[ThemeName.light],
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (
      !storedTheme ||
      !(
        Object.keys(ThemeName).includes(storedTheme) &&
        typeof ThemeName[storedTheme as keyof typeof ThemeName] !== "undefined"
      )
    ) {
      return ThemeName[ThemeName.light];
    }
    return storedTheme;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ThemeName[ThemeName.light]
        ? ThemeName[ThemeName.dark]
        : ThemeName[ThemeName.light]
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
