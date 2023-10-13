import path from "path";
import { defineConfig } from "vite";
import copy from "vite-plugin-copy";
import commonjs from "vite-plugin-commonjs";
export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/index.js",
      output: {
        dir: path.resolve(__dirname, "dist"),
      },
    },
  },
  plugins: [
    commonjs(),
    copy({
      copyOnce: true,
      targets: [
        {
          src: path.resolve(
            __dirname,
            "node_modules/@shoelace-style/shoelace/dist/assets"
          ),
          dest: path.resolve(__dirname, "dist/shoelace"),
        },
      ],
    }),
  ],
});
