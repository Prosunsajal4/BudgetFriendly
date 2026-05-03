import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function App({ Component, pageProps }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Personal Finance Tracker
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Component {...pageProps} />
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
