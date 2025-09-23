"use client";
import { AuthButtons } from "./AuthButtons";
import { useTheme } from "@/contexts/ThemeContext";
import { useActiveTab } from "@/hooks/useActiveTab";
import Link from "next/link";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isHome, isDashboard, isPresets, isSettings } = useActiveTab();
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primera fila - Logo y controles */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">ValidAR</span>
              </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200 border border-gray-600 dark:border-gray-600 border-gray-300 hover:border-gray-500 dark:hover:border-gray-500 hover:border-gray-400"
              title="Buscar (⌘K)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">⌘K</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-9 h-9 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              title={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://github.com/franlopezmora/validAR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-all duration-200"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/in/franlopezmora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-all duration-200"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <AuthButtons />
          </div>
        </div>

        {/* Segunda fila - Navegación (solo en dashboard, presets y settings) */}
        {!isHome && (
          <div className="hidden md:block py-3">
            <nav className="flex space-x-8">
              <Link 
                href="/dashboard" 
                className={`py-1 px-1 border-b-2 cursor-pointer text-sm ${
                  isDashboard 
                    ? "border-white text-white font-medium" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/presets" 
                className={`py-1 px-1 border-b-2 cursor-pointer text-sm ${
                  isPresets 
                    ? "border-white text-white font-medium" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Formatos
              </Link>
              <Link 
                href="/settings" 
                className={`py-1 px-1 border-b-2 cursor-pointer text-sm ${
                  isSettings 
                    ? "border-white text-white font-medium" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Settings
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
