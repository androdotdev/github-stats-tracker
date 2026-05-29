"use client";
import { signIn } from "@/lib/auth-client";

export default function Home() {
  return (
    <div>
      <button onClick={signIn}>Click</button>
    </div>
  );
}
