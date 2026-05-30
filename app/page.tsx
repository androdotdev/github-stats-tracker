"use client";
import { signIn, useSession } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {


  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      router.push("/dashboard");
    }
  }, [session.data])
  
  if (session.isPending) return null  // loading

  if(!session.data){
    return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={signIn}>Sign In</button>
    </div>
  );
  }

  return;
    
}
