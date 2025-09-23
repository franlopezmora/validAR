"use client";
import { useState, useEffect } from "react";

type Preset = { id:string; type:"cuit"|"dni"|"alias"|"plate"|"phone"|"cbu"|"cvu"|string; name:string; pattern?:string; isDefault:boolean; };

export default function PresetsClient() {
  const [items, setItems] = useState<Preset[]>([]);
  const [name, setName] = useState("Con guiones");
  const [pattern, setPattern] = useState("NN-NNNNNNNN-N");
  const [selectedType, setSelectedType] = useState<"cuit"|"dni"|"plate"|"phone"|"cbu"|"cvu">("cuit");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function getTypeLabel(type: "cuit"|"dni"|"plate"|"phone"|"cbu"|"cvu"): string {
    const labels = {
      cuit: "CUIT",
      dni: "DNI",
      plate: "Patente",
      phone: "Teléfono",
      cbu: "CBU",
      cvu: "CVU"
    };
    return labels[type];
  }

  async function load() {
    const r = await fetch("/api/presets");
    if (r.ok) {
      const j = await r.json();
      setItems(j.items || []);
    } else {
      setItems([]);
    }
  }
  
  useEffect(() => { load(); }, []);

  async function save() {
    const r = await fetch("/api/presets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: selectedType, name, pattern, isDefault: true }),
    });
    if (r.ok) load();
  }

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Formatos Personalizados</h1>
            <p className="text-gray-400">Crea y gestiona tus propios formatos de validación</p>
          </div>
        </div>
      </div>

      {/* Crear Nuevo Formato */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6">Crear Nuevo Formato</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                data-open={isDropdownOpen}
                onClick={() => setIsDropdownOpen(o => !o)}
                onBlur={(e) => {
                // si el blur fue porque clickeaste dentro del panel, no cierres
                setTimeout(() => setIsDropdownOpen(false), 0);
                }}
                className={[
                "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500",
                "flex items-center justify-between",
                // fondo fijo para que no cambie con hover
                "bg-gray-700 border-gray-600 text-white",
                // cuando está abierto, aclaramos apenas
                isDropdownOpen ? "bg-gray-600" : ""
                ].join(" ")}
            >
                <span>{getTypeLabel(selectedType)}</span>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

        {isDropdownOpen && (
            <div
            className="absolute top-full left-0 right-0 mt-2 z-50"
            // evita que el click quite el foco del botón (y lo cierre antes de tiempo)
            onMouseDown={(e) => e.preventDefault()}
            role="listbox"
            >
            <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2">
                 {(["cuit", "dni", "plate", "phone", "cbu", "cvu"] as const).map((type) => (
                 <button
                     key={type}
                     type="button"
                     role="option"
                     aria-selected={selectedType === type}
                     onClick={() => {
                     setSelectedType(type);
                     setIsDropdownOpen(false);
                     }}
                     className="w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-between"
                 >
                     <span>{getTypeLabel(type)}</span>
                     {selectedType === type && (
                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                         </svg>
                     )}
                 </button>
                 ))}
            </div>
            </div>
        )}
        </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del formato"
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Patrón (ej: NN-NNNNNNNN-N)"
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={save}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200 cursor-pointer"
          >
            Guardar Formato
          </button>
        </div>
      </div>
      
      {/* Mis Formatos Guardados */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Mis Formatos Guardados</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <div>
                <span className="font-medium text-white">{item.name}</span>
                <span className="ml-2 px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded border border-gray-500">
                  {item.type}
                </span>
                {item.isDefault && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded border border-blue-500">
                    Por defecto
                  </span>
                )}
                {item.pattern && (
                  <p className="text-sm text-gray-400 mt-1">Patrón: {item.pattern}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 mt-6">
          <a 
            href="/api/presets/export" 
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200 cursor-pointer inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar Formatos
          </a>
          <label className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-colors duration-200 cursor-pointer inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Importar Formatos
            <input 
              type="file" 
              accept="application/json"
              onChange={async (e) => {
                const file = e.target.files?.[0]; 
                if (!file) return;
                const text = await file.text();
                await fetch("/api/presets/import", { 
                  method: "POST", 
                  headers: { "Content-Type": "application/json" }, 
                  body: text 
                });
                load();
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </main>
  );
}
