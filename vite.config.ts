import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  build: {
    rollupOptions: {
      input: ["index.html"],
      output: {
        dir: path.resolve(__dirname, "dist"),
      },
    },
  },
  plugins: [
    commonjs(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@shoelace-style/shoelace/dist/assets",
          dest: "shoelace",
        },
      ],
    }),
  ],
});
