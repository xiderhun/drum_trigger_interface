import { Drum } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center space-x-4">
        <Drum className="h-6 w-6" />
        <h1 className="text-xl font-bold">Drum Interface</h1>
      </div>
    </header>
  );
}