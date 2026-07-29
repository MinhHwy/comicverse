import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {children}
      </main>

      <Footer />
    </>
  );
}