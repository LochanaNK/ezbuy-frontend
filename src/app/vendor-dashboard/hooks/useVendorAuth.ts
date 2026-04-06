"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useVendorAuth = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("ezbuy_user");
    
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        
        // Role Check: 2 is Vendor. If not, kick them out.
        if (user.roleId !== 2 && user.role !== "Vendor") {
          router.push("/");
        } else {
          setVendor(user);
        }
      } catch (e) {
        console.error("Auth Hook: Failed to parse user cookie", e);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    setIsReady(true);
  }, [router]);

  return { vendor, isReady };
};