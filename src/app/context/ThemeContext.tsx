"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light";
export type ResolvedTheme = "light";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "nyeras-theme";

function forceLightModeOnDocument() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark");
  root.setAttribute("data-theme", "light");
  root.style.colorScheme = "light";
  if (document.body) {
    document.body.style.colorScheme = "light";
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "light");
    } catch (e) {
      // localStorage may be inaccessible
    }
    forceLightModeOnDocument();

    // Guard against browser extensions or dynamic system shifts attempting to force dark
    const observer = new MutationObserver(() => {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
      }
      if (root.getAttribute("data-theme") !== "light") {
        root.setAttribute("data-theme", "light");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback(() => {
    forceLightModeOnDocument();
  }, []);

  const toggleTheme = useCallback(() => {
    forceLightModeOnDocument();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
        resolvedTheme: "light",
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
