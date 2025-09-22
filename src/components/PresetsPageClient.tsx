"use client";
import { useState, useEffect } from "react";
import { AuthButtons } from "@/components/AuthButtons";
import { applyPattern, validateCUIT, formatCUIT, validatePatente, applyPlatePattern, validatePhoneAR, normalizeARPhoneE164, formatARPhonePretty, validateCBU, formatCBU, validateCVU, formatCVU } from "@validar/core";

type Preset = { id:string; type:string; name:string; pattern?:string; isDefault:boolean; };

export default function PresetsPageClient() {
  const [items, setItems] = useState<Preset[]>([]);
  const [name, setName] = useState("Con guiones");
  const [pattern, setPattern] = useState("NN-NNNNNNNN-N");
  const [cuit, setCuit] = useState("");
  const [defaultCuitPattern, setDefaultCuitPattern] = useState<string | null>(null);
  const [plate, setPlate] = useState("");
  const [platePattern, setPlatePattern] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [phonePreset, setPhonePreset] = useState<"e164" | "pretty" | null>(null);
  const [cbu, setCbu] = useState("");
  const [cbuPattern, setCbuPattern] = useState<string | null>(null);
  const [cvu, setCvu] = useState("");
  const [cvuPattern, setCvuPattern] = useState<string | null>(null);

  async function load() {
    const r = await fetch("/api/presets");
    if (r.ok) {
      const j = await r.json();
      setItems(j.items || []);
      const def = (j.items || []).find((p: Preset) => p.type === "cuit" && p.isDefault && p.pattern);
      setDefaultCuitPattern(def?.pattern ?? null);
      setPlatePattern((j.items || []).find((p: Preset) => p.type === "plate" && p.isDefault && p.pattern)?.pattern ?? null);
      const phonePat = (j.items || []).find((p: Preset) => p.type === "phone" && p.isDefault && p.pattern)?.pattern?.toLowerCase();
      setPhonePreset(phonePat === "e164" ? "e164" : phonePat === "pretty" ? "pretty" : null);
      setCbuPattern((j.items || []).find((p: Preset) => p.type === "cbu" && p.isDefault && p.pattern)?.pattern ?? null);
      setCvuPattern((j.items || []).find((p: Preset) => p.type === "cvu" && p.isDefault && p.pattern)?.pattern ?? null);
    } else {
      setItems([]);
      setDefaultCuitPattern(null);
      setPlatePattern(null);
      setPhonePreset(null);
      setCbuPattern(null);
      setCvuPattern(null);
    }
  }
  useEffect(()=>{ load(); },[]);

  async function save() {
    const r = await fetch("/api/presets", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ type:"cuit", name, pattern, isDefault:true }),
    });
    if (r.ok) load();
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ValidAR — Presets</h1>
        <AuthButtons />
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">Patente AR</h2>
        <p className="text-sm opacity-80">Preset: {platePattern ?? "—"}</p>
        <div className="flex gap-2">
          <input value={plate} onChange={e=>setPlate(e.target.value)} placeholder="AA123AA" className="border p-2 rounded w-full" />
          <button onClick={()=>setPlate(platePattern ? applyPlatePattern(plate, platePattern) : plate.toUpperCase().replace(/\s+/g, ""))} className="px-3 py-2 rounded bg-black text-white">Aplicar preset</button>
        </div>
        <div className="text-sm">Estado: {plate ? (validatePatente(plate) ? <span className="text-green-700">Válida</span> : <span className="text-red-700">Inválida</span>) : <span className="text-gray-500">—</span>}</div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">Teléfono AR</h2>
        <p className="text-sm opacity-80">Preset: {phonePreset ?? "—"}</p>
        <div className="flex gap-2">
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+54 11 1234-5678" className="border p-2 rounded w-full" />
          <button onClick={()=>{
            if (phonePreset === "e164") { const n = normalizeARPhoneE164(phone); if (n) setPhone(n); }
            else if (phonePreset === "pretty") setPhone(formatARPhonePretty(phone));
            else setPhone(formatARPhonePretty(phone));
          }} className="px-3 py-2 rounded bg-black text-white">Aplicar preset</button>
        </div>
        <div className="text-sm">Estado: {phone ? (validatePhoneAR(phone) ? <span className="text-green-700">Válido</span> : <span className="text-red-700">Inválido</span>) : <span className="text-gray-500">—</span>}</div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">CBU</h2>
        <p className="text-sm opacity-80">Preset: {cbuPattern ?? "—"}</p>
        <div className="flex gap-2">
          <input value={cbu} onChange={e=>setCbu(e.target.value)} placeholder="28505909 40090418135201" className="border p-2 rounded w-full" />
          <button onClick={()=>setCbu(cbuPattern ? applyPattern(cbu, cbuPattern) : formatCBU(cbu))} className="px-3 py-2 rounded bg-black text-white">Aplicar preset</button>
        </div>
        <div className="text-sm">Estado: {cbu ? (validateCBU(cbu) ? <span className="text-green-700">Válido</span> : <span className="text-red-700">Inválido</span>) : <span className="text-gray-500">—</span>}</div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">CVU</h2>
        <p className="text-sm opacity-80">Preset: {cvuPattern ?? "—"}</p>
        <div className="flex gap-2">
          <input value={cvu} onChange={e=>setCvu(e.target.value)} placeholder="00000000 00000000000000" className="border p-2 rounded w-full" />
          <button onClick={()=>setCvu(cvuPattern ? applyPattern(cvu, cvuPattern) : formatCVU(cvu))} className="px-3 py-2 rounded bg-black text-white">Aplicar preset</button>
        </div>
        <div className="text-sm">Estado: {cvu ? (validateCVU(cvu) ? <span className="text-green-700">Válido</span> : <span className="text-red-700">Inválido</span>) : <span className="text-gray-500">—</span>}</div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">Probar formateo de CUIT</h2>
        <p className="text-sm opacity-80">Formateo {defaultCuitPattern ? (<><span>con tu preset </span><code>{defaultCuitPattern}</code></>) : "por defecto"}.</p>
        <div className="flex gap-2">
          <input
            value={cuit}
            onChange={(e)=>setCuit(e.target.value)}
            placeholder="20-12345678-3"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={() => setCuit(defaultCuitPattern ? applyPattern(cuit, defaultCuitPattern) : formatCUIT(cuit))}
            className="px-3 py-2 rounded bg-black text-white"
          >
            Formatear
          </button>
        </div>
        <div className="text-sm">
          Estado: {cuit ? (validateCUIT(cuit) ? <span className="text-green-700">Válido</span> : <span className="text-red-700">Inválido</span>) : <span className="text-gray-500">—</span>}
        </div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">Guardar preset de CUIT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input className="border p-2 rounded" value="cuit" readOnly />
          <input className="border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" />
          <input className="border p-2 rounded" value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Patrón" />
        </div>
        <button onClick={save} className="px-3 py-2 rounded bg-black text-white">Guardar</button>
        <p className="text-xs opacity-70">Requiere sesión. El preset se guarda asociado a tu usuario.</p>
        <div className="flex gap-2 pt-2">
          <a href="/api/presets/export" className="px-3 py-2 rounded bg-neutral-900 text-white inline-block">Exportar presets</a>
          <input type="file" accept="application/json" onChange={async (e)=>{
            const file = e.target.files?.[0]; if (!file) return;
            const text = await file.text();
            await fetch("/api/presets/import", { method:"POST", headers:{ "Content-Type":"application/json" }, body: text });
            load();
          }} className="border p-2 rounded" />
        </div>
      </div>

      <div className="p-4 border rounded-xl space-y-3">
        <h2 className="font-medium">Mis presets</h2>
        <ul className="list-disc pl-5">
          {items.map(p => (
            <li key={p.id}><b>{p.type}</b> — {p.name} {p.isDefault ? "(default)" : ""} {p.pattern ? `· ${p.pattern}` : ""}</li>
          ))}
          {items.length===0 && <li className="list-none opacity-60">— (vacío o sin sesión)</li>}
        </ul>
      </div>
    </main>
  );
}


