import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/sections/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40 pb-20 container-wide max-w-4xl">
        {children}
      </main>
      <Footer />
    </>
  );
}
