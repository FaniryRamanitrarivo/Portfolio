"use client";

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center py-4">
        <span className="text-gray-300 text-sm animate-pulse">
          Checking session...
        </span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-gray-300 text-sm">
          {session.user?.email}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full cursor-pointer py-2 rounded-xl bg-red-500/90 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      
      {/* Google */}
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/admin",
            prompt: "select_account",
          })
        }
        className="flex cursor-pointer items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition"
      >
        <FaGoogle />
        Continue with Google
      </button>

      {/* GitHub */}
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/admin",
          })
        }
        className="flex cursor-pointer items-center justify-center gap-3 w-full py-3 rounded-xl bg-gray-900 text-white font-medium border border-gray-700 hover:bg-black transition"
      >
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
}