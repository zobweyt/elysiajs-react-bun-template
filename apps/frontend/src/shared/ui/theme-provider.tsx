import { createContext, use, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  localStorageKey?: string;
};

export type ThemeProviderContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextValue | null>(
  null,
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  localStorageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(localStorageKey) as Theme) || defaultTheme,
  );

  const [systemTheme, setSystemTheme] = useState<Theme>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      window.document.documentElement.classList.add(resolvedTheme);
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  if (context === null) {
    throw new Error(
      "The useTheme hook must be used within a <ThemeProvider />",
    );
  }

  return context;
};
