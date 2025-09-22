"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function AuthButtons() {
  const { data } = useSession();
  return data?.user ? (
    <div className="flex items-center gap-3">
      {data.user.image && (
        <Image 
          src={data.user.image} 
          alt="Avatar del usuario" 
          width={24} 
          height={24} 
          className="w-6 h-6 rounded-full" 
        />
      )}
      <span className="text-sm">{data.user.name || data.user.email}</span>
      <button onClick={()=>signOut()} className="px-3 py-1 rounded bg-neutral-900 text-white">Salir</button>
    </div>
  ) : (
    <button onClick={()=>signIn("github")} className="px-3 py-1 rounded bg-neutral-900 text-white">Ingresar</button>
  );
}


