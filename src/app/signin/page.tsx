"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <main className="min-h-screen p-6 grid place-items-center">
      <div className="p-6 border rounded-xl space-y-4 text-center">
        <h1 className="text-xl font-semibold">Ingresar</h1>
        <p className="opacity-80">Usá tu cuenta de GitHub para continuar.</p>
        <button
          onClick={()=>signIn("github", { callbackUrl: "/" })}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Ingresar con GitHub
        </button>
      </div>
    </main>
  );
}


