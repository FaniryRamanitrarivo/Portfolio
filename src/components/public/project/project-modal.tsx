"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type ProjectModalProps = {
  children: React.ReactNode;
};

export default function ProjectModal({ children }: ProjectModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC pour fermer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // Click outside pour fermer
  const onBackdropClick = (e: React.MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      router.back();
    }
  };

  return (
    <div
      onClick={onBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Bouton close */}
        <button
          onClick={() => router.back()}
          className="sticky top-4 right-4 float-right z-10 w-10 h-10 flex items-center justify-center bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
