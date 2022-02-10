import { createContext, useContext, useEffect, useState } from "react";

type Themes = "light" | "dark";
export interface ThemeContextInterface {
  theme: Themes;
  setTheme: (theme: Themes) => any;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: "light",
  setTheme: (theme: string) => {},
});

const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">(
    typeof localStorage === "undefined" ? "light" : localStorage?.theme
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  return useContext(ThemeContext);
};
export default ThemeProvider;
