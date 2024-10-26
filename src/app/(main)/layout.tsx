import AppSidebar from "@/components/layout/app-sidebar";
import { auth } from "@/auth"; // Pastikan ini sesuai dengan import auth dari NextAuth
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Jika tidak ada user di session, redirect ke halaman login atau home
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
}
