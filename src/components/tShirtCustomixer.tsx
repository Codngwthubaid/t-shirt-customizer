import { useTheme } from "../context/themeProvider"
import { RefreshCw } from "lucide-react"
import type { themeTypes } from "../types";
import { Button } from "./ui/button";
import CustomizationForm from "./customizationForm";

export default function TShirtCustomizer() {

    const { setThemeFunction, theme } = useTheme()

    const themeStyles = (theme: themeTypes) => {
        switch (theme) {
            case "light":
                return {
                    mainBg: 'bg-gray-50',
                    accent: 'bg-blue-500',
                    text: 'text-gray-800',
                    formBg: 'bg-white',
                    border: 'border-gray-200',
                    button: 'bg-blue-500 hover:bg-blue-600 text-white',
                    heading: 'text-gray-900',
                    shadow: 'shadow-md'
                };
            case "dark":
                return {
                    mainBg: 'bg-slate-900',
                    accent: 'bg-amber-500',
                    text: 'text-gray-100',
                    formBg: 'bg-slate-800',
                    border: 'border-slate-700',
                    button: 'bg-amber-500 hover:bg-amber-600 text-slate-900',
                    heading: 'text-amber-400',
                    shadow: 'shadow-xl'
                };
            case "purple":
                return {
                    mainBg: 'bg-purple-50',
                    accent: 'bg-purple-500',
                    text: 'text-gray-800',
                    formBg: 'bg-white',
                    border: 'border-purple-200',
                    button: 'bg-purple-500 hover:bg-purple-600 text-white',
                    heading: 'text-purple-900',
                    shadow: 'shadow-lg'
                };
            default:
                return {
                    mainBg: 'bg-slate-900',
                    accent: 'bg-amber-500',
                    text: 'text-gray-100',
                    formBg: 'bg-slate-800',
                    border: 'border-slate-700',
                    button: 'bg-amber-500 hover:bg-amber-600 text-slate-900',
                    heading: 'text-amber-400',
                    shadow: 'shadow-xl'
                };
        }
    }

    const styles = themeStyles(theme)

    return (
        <div className={`min-h-screen ${styles.mainBg} ${styles.text} transition-all duration-500 ease-in-out`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className={`sm:text-3xl font-bold ${styles.heading} transition-colors duration-500`}>
                        T-Shirt Customizer
                    </h1>
                    <Button
                        onClick={setThemeFunction}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${styles.button} transition-all duration-300 ${styles.shadow} cursor-pointer`}
                        title="Alt+Q to switch theme"
                    >
                        <RefreshCw className="size-3 sm:size-5" />
                        <span className="text-sm sm:text-base">Theme ({theme})</span>
                    </Button>
                </div>

                <div className={`${styles.formBg} rounded-lg ${styles.border} border ${styles.shadow} transition-all duration-500`}>
                    <CustomizationForm theme={theme} styles={styles} />
                </div>

                <div className="mt-6 text-center text-sm opacity-70">
                    Press Alt+Q to switch between themes
                </div>
            </div>
        </div>
    )
}