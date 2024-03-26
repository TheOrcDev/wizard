import { OpenAICompletion } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Image src={"/wizard.webp"} fill alt="Wizard" />
      <div className="z-10 mt-5 flex flex-col gap-5 text-center">
        <h1>Wizard AI</h1>
        <OpenAICompletion />
      </div>
    </main>
  );
}
