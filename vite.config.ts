import { copy } from "vite-plugin-copy";

export default {
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@shoelace-style/shoelace/dist/*",
          dest: "public/shoelace",
        },
      ],
      hook: "writeBundle", // ensures the assets are copied during the build
    }),
  ],
};
