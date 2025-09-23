"use client";
import { useState, useEffect } from "react";
import {
  validateCUIT, formatCUIT,
  validateDNI, formatDNI,
  validateAlias,
  validatePatente, applyPlatePattern,
  validatePhoneAR, normalizeARPhoneE164, formatARPhonePretty,
  validateCBU, formatCBU,
  validateCVU, formatCVU,
  applyPattern
} from "@validar/core";

type Preset = { id:string; type:"cuit"|"dni"|"alias"|"plate"|"phone"|"cbu"|"cvu"|string; name:string; pattern?:string; isDefault:boolean; };

export default function DashboardClient() {
  const [items, setItems] = useState<Preset[]>([]);
  
  // Inputs
  const [cuitInput, setCuitInput] = useState("");
  const [dniInput, setDniInput] = useState("");
  const [aliasInput, setAliasInput] = useState("");
  const [plateInput, setPlateInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [cbuInput, setCbuInput] = useState("");
  const [cvuInput, setCvuInput] = useState("");
  
  // Patterns
  const [cuitPattern, setCuitPattern] = useState<string | null>(null);
  const [dniPattern, setDniPattern] = useState<string | null>(null);
  const [platePattern, setPlatePattern] = useState<string | null>(null);
  const [phonePreset, setPhonePreset] = useState<"e164" | "pretty" | null>(null);
  const [cbuPattern, setCbuPattern] = useState<string | null>(null);
  const [cvuPattern, setCvuPattern] = useState<string | null>(null);

  async function load() {
    const r = await fetch("/api/presets");
    if (r.ok) {
      const j = await r.json();
      setItems(j.items || []);
      
      // Set default patterns
      setCuitPattern((j.items || []).find((p: Preset) => p.type === "cuit" && p.isDefault && p.pattern)?.pattern ?? null);
      setDniPattern((j.items || []).find((p: Preset) => p.type === "dni" && p.isDefault && p.pattern)?.pattern ?? null);
      setPlatePattern((j.items || []).find((p: Preset) => p.type === "plate" && p.isDefault && p.pattern)?.pattern ?? null);
      const phonePat = (j.items || []).find((p: Preset) => p.type === "phone" && p.isDefault && p.pattern)?.pattern?.toLowerCase();
      setPhonePreset(phonePat === "e164" ? "e164" : phonePat === "pretty" ? "pretty" : null);
      setCbuPattern((j.items || []).find((p: Preset) => p.type === "cbu" && p.isDefault && p.pattern)?.pattern ?? null);
      setCvuPattern((j.items || []).find((p: Preset) => p.type === "cvu" && p.isDefault && p.pattern)?.pattern ?? null);
    } else {
      setItems([]);
      setCuitPattern(null);
      setDniPattern(null);
      setPlatePattern(null);
      setPhonePreset(null);
      setCbuPattern(null);
      setCvuPattern(null);
    }
  }
  
  useEffect(() => { load(); }, []);

  // Format functions
  const formatCuit = (input: string) => {
    if (cuitPattern) return applyPattern(input, cuitPattern);
    return formatCUIT(input);
  };

  const formatDni = (input: string) => {
    if (dniPattern) return applyPattern(input, dniPattern);
    return formatDNI(input);
  };

  const formatPlate = (input: string) => {
    if (platePattern) return applyPlatePattern(input, platePattern);
    return input.toUpperCase().replace(/\s+/g, "");
  };

  const formatPhone = (input: string) => {
    if (phonePreset === "e164") {
      const normalized = normalizeARPhoneE164(input);
      return normalized || input;
    } else if (phonePreset === "pretty") {
      return formatARPhonePretty(input);
    }
    return formatARPhonePretty(input);
  };

  const formatCbu = (input: string) => {
    if (cbuPattern) return applyPattern(input, cbuPattern);
    return formatCBU(input);
  };

  const formatCvu = (input: string) => {
    if (cvuPattern) return applyPattern(input, cvuPattern);
    return formatCVU(input);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Valida y formatea documentos argentinos en tiempo real</p>
          </div>
        </div>
      </div>

      {/* Validadores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CUIT Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">CUIT</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              cuitInput ? (validateCUIT(cuitInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {cuitInput ? (validateCUIT(cuitInput) ? "Válido" : "Inválido") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Formato: {cuitPattern ?? "Por defecto"}</p>
          <div className="space-y-3">
            <input
              value={cuitInput}
              onChange={(e) => setCuitInput(e.target.value)}
              placeholder="20123456789"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setCuitInput(formatCuit(cuitInput))}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-500 hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Formatear
            </button>
          </div>
        </div>

        {/* DNI Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">DNI</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              dniInput ? (validateDNI(dniInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {dniInput ? (validateDNI(dniInput) ? "Válido" : "Inválido") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Formato: {dniPattern ?? "Por defecto"}</p>
          <div className="space-y-3">
            <input
              value={dniInput}
              onChange={(e) => setDniInput(e.target.value)}
              placeholder="12345678"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setDniInput(formatDni(dniInput))}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-500 hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Formatear
            </button>
          </div>
        </div>

        {/* Alias Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Alias</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              aliasInput ? (validateAlias(aliasInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {aliasInput ? (validateAlias(aliasInput) ? "Válido" : "Inválido") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Solo validación (sin formato)</p>
          <div className="space-y-3">
            <input
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              placeholder="mi.alias"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Patente Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Patente</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              plateInput ? (validatePatente(plateInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {plateInput ? (validatePatente(plateInput) ? "Válida" : "Inválida") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Formato: {platePattern ?? "Por defecto"}</p>
          <div className="space-y-3">
            <input
              value={plateInput}
              onChange={(e) => setPlateInput(e.target.value)}
              placeholder="ABC123 o AA123AA"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setPlateInput(formatPlate(plateInput))}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-500 hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Formatear
            </button>
          </div>
        </div>

        {/* Teléfono Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Teléfono AR</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              phoneInput ? (validatePhoneAR(phoneInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {phoneInput ? (validatePhoneAR(phoneInput) ? "Válido" : "Inválido") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Formato: {phonePreset ?? "Por defecto"}</p>
          <div className="space-y-3">
            <input
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="+54 9 11 1234-5678"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setPhoneInput(formatPhone(phoneInput))}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-500 hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Formatear
            </button>
          </div>
        </div>

        {/* CBU Card */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">CBU</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              cbuInput ? (validateCBU(cbuInput) ? "text-green-400 bg-green-400/20" : "text-red-400 bg-red-400/20") : "text-gray-400 bg-gray-400/20"
            }`}>
              {cbuInput ? (validateCBU(cbuInput) ? "Válido" : "Inválido") : "—"}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Formato: {cbuPattern ?? "Por defecto"}</p>
          <div className="space-y-3">
            <input
              value={cbuInput}
              onChange={(e) => setCbuInput(e.target.value)}
              placeholder="1234567890123456789012"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setCbuInput(formatCbu(cbuInput))}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg border border-blue-500 hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Formatear
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
