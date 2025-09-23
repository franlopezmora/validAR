"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SettingsClientProps {
  user: User;
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const { data: session } = useSession();
  const [name, setName] = useState(user.name || "");
  const [email] = useState(user.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implementar actualización de perfil
    setTimeout(() => {
      setIsLoading(false);
      // Mostrar notificación de éxito
    }, 1000);
  };

  const handleExportPresets = async () => {
    try {
      const response = await fetch("/api/presets/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "validar-presets.json";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting presets:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      // TODO: Implementar eliminación de cuenta
      console.log("Delete account");
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Configuración de tu cuenta y preferencias</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* General Section */}
        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-2">General</h2>
          <p className="text-gray-400 mb-6">Actualiza tu información personal</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tu nombre:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tu email:
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.725-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                El email es gestionado por tu proveedor OAuth
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-2">Account</h2>
          <p className="text-gray-400 mb-6">Configuración de tu cuenta</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Exportar formatos:
              </label>
              <button
                onClick={handleExportPresets}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar todos los formatos
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Eliminar cuenta:
              </label>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 bg-gray-700 text-red-400 rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 hover:text-red-300 transition-colors duration-200 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
