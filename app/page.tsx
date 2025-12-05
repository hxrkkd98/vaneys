import Image from "next/image";
import { Button } from '@heroui/react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="secondary">
        My Button
      </Button>
    </div>
  );
}
