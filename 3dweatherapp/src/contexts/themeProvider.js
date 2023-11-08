import React, { useState, useEffect } from "react";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme])

    const switchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}