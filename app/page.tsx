import Image from "next/image";
import { Button, Input, LayerCard } from "@cloudflare/kumo";
export default function Home() {
  return (
    <>
      <Button>Click me</Button>
      <Input
        label="Email"
      placeholder="you@example.com"
      description="We'll never share your email"
      />
    </>
  );
}
