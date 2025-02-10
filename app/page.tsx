import Image from "next/image";
import Corrector from "@/components/Corrector";




export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Corrector />
    </main>
  );
}