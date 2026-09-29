import { revalidatePath } from "next/cache";

// Public pages (home, /about, /projects/[id]) are statically prerendered at build
// time and read from Prisma directly — no tagged fetch/unstable_cache — so tag
// revalidation has nothing to invalidate. Purge the prerendered paths instead.
export function revalidatePublicPages() {
  revalidatePath("/", "layout");
}
