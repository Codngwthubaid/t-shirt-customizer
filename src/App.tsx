
import TShirtCustomizer from "./components/tShirtCustomixer";
import ThemeProvider from "./context/themeProvider";


export default function App() {
  return (
  <ThemeProvider>
    <TShirtCustomizer />
  </ThemeProvider>
  )
}