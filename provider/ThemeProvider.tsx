import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const initialTheme = {
  isDark: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext(initialTheme);
export function useTheme() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return { isDark, toggleTheme };
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(initialTheme.isDark);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
        setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
        setIsDark(false);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setIsDark(event.matches);
      });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
