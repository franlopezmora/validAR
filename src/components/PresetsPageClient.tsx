"use client";
import { useState, useEffect } from "react";
import { AuthButtons } from "@/components/AuthButtons";

type Preset = { id:string; type:string; name:string; pattern?:string; isDefault:boolean; };

export default function PresetsPageClient() {
  const [items, setItems] = useState<Preset[]>([]);
  const [name, setName] = useState("Con guiones");
  const [pattern, setPattern] = useState("NN-NNNNNNNN-N");

  async function load() {
    const r = await fetch("/api/presets");
    if (r.ok) {
      const j = await r.json();
      setItems(j.items || []);
    } else {
      setItems([]);
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
        <h2 className="font-medium">Guardar preset de CUIT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input className="border p-2 rounded" value="cuit" readOnly />
          <input className="border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" />
          <input className="border p-2 rounded" value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Patrón" />
        </div>
        <button onClick={save} className="px-3 py-2 rounded bg-black text-white">Guardar</button>
        <p className="text-xs opacity-70">Requiere sesión. El preset se guarda asociado a tu usuario.</p>
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


