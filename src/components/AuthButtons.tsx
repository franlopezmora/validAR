"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function AuthButtons() {
  const { data } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return data?.user ? (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        {data.user.image && (
          <div className="hover:bg-gray-700 p-2 rounded-lg transition-all duration-200 cursor-pointer w-9 h-9 flex items-center justify-center">
            <Image 
              src={data.user.image} 
              alt="Avatar del usuario" 
              width={24} 
              height={24} 
              className="w-5 h-5 rounded-full hover:opacity-80 transition-opacity duration-200" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{data.user.name}</p>
            <p className="text-xs text-gray-400">{data.user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link 
              href="/" 
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Inicio
            </Link>
            
            <Link 
              href="/presets" 
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
              Dashboard
            </Link>

            <Link 
              href="/settings"
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>

            <a 
              href="https://github.com/franlopezmora/validAR/issues" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Reportar bug
              <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>


            <div className="border-t border-gray-700 mt-1 pt-1">
              <button 
                onClick={() => {
                  setIsDropdownOpen(false);
                  signOut();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <button 
      onClick={() => signIn("github")} 
      className="px-4 py-2 text-sm bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
    >
      Ingresar
    </button>
  );
}


