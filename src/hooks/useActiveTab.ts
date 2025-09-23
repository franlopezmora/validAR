"use client";
import { usePathname } from "next/navigation";

export function useActiveTab() {
  const pathname = usePathname();
  
  return {
    isHome: pathname === "/",
    isDashboard: pathname === "/dashboard",
    isPresets: pathname === "/presets",
    isSettings: pathname === "/settings"
  };
}
