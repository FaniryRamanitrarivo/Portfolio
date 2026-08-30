import AdminNavbar from "@/src/components/admin/admin-header";
import AdminProject from "@/src/components/admin/admin-project";
import { authOptions } from "@/src/lib/auth";
import { env } from "@/src/lib/env";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  if (!env.AUTH_DISABLED) {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }
  }

  return (
    <>
      <AdminNavbar />
      <AdminProject />
    </>
  );
}
