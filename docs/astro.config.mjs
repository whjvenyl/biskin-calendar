import { defineConfig } from "astro/config";
import atomico from "@atomico/vite";

// https://astro.build/config
export default defineConfig({
  base: ".",
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [
      ...atomico({
        cssLiterals: { postcss: true, minify: true },
      }),
    ],
  },
});
