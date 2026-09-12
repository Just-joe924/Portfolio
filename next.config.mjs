/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /**
     * Keep @vercel/og out of the webpack bundle. It loads its font and its two
     * .wasm files from paths relative to its own module, so it only works when
     * it's still sitting in node_modules next to them — bundled into a chunk
     * under .next/, those siblings aren't there.
     *
     * See the note at the top of src/lib/og.tsx for why the package is a direct
     * dependency rather than next/og.
     */
    serverComponentsExternalPackages: ["@vercel/og"],

    /**
     * The image generators read their fonts from src/assets/fonts at runtime,
     * which the bundler can't see. Every card and icon is prerendered at build
     * time, so this only matters if one is ever rendered on demand — but
     * without it that request would silently fall back to the default face.
     */
    outputFileTracingIncludes: {
      "/**": ["./src/assets/fonts/**"],
    },
  },
};

export default nextConfig;
