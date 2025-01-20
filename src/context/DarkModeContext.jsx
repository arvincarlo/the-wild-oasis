import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 1. Create a new Context
const DarkModeContext = createContext();

function DarkModeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }

    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode(darkMode => !darkMode);
    } 

    // 2. Provide the context into the children and return it
    return (
        <DarkModeContext.Provider value={{
            isDarkMode,
            toggleDarkMode
        }}>
            {children}
        </DarkModeContext.Provider>
    );
}

// 3. Create a custom hook to use the dark mode provider
function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (!context) throw new Error('Dark mode context was used outside of the provider');

    return context;
}

export { DarkModeProvider, useDarkMode }
