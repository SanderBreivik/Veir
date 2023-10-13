export default {
  server: {
    proxy: {
      "/shoelace": {
        target: "node_modules/@shoelace-style/shoelace",
        rewrite: (path) => path.replace(/^\/shoelace/, ""),
      },
    },
  },
};
