import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const openNextConfig = {
  ...defineCloudflareConfig({}),
  // OpenNext runs this internally to build the Next.js app. We point it at
  // `next:build` (plain `next build`) so it never re-enters `bun run build`
  // (which itself calls `opennextjs-cloudflare build` → infinite loop).
  buildCommand: "bun run next:build",
};

export default openNextConfig;
