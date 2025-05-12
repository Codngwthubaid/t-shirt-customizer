import React, { useContext, createContext, useState, useEffect } from "react"
import type { themeTypes } from "../types"
import { Toaster } from "@/components/ui/sonner"

interface ThemeProviderProps {
    theme: themeTypes,
    setThemeFunction: () => void
}


const themeContext = createContext<ThemeProviderProps | undefined>(undefined)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [isTheme, setIsTheme] = useState<themeTypes>("purple")


    const setThemeFunction = () => {
        setIsTheme((prev) => {
            if (prev === "light") return "dark"
            if (prev === "dark") return "purple"
            return "light"
        })
    }


    useEffect(() => {

        const keyHandler = (e: KeyboardEvent) => {
            if (e.altKey && e.key === "q") setThemeFunction()
        }

        window.addEventListener("keydown", keyHandler)
        return () => { window.removeEventListener("keydown", keyHandler) }

    }, [])

    return (
     <themeContext.Provider value={{ theme: isTheme, setThemeFunction }}>
        {children}
        <Toaster />
     </themeContext.Provider>
    )
}


export const useTheme = (): ThemeProviderProps => {
    const context = useContext(themeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}