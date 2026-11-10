import { defineConfig } from "tsup";
import vue from "unplugin-vue/esbuild";

export default defineConfig({
  entry: {
    index:         "src/core/index.ts",
    "react/index": "src/react/index.ts",
    "vue/index":   "src/vue/index.ts",
  },
  format: ["esm", "cjs"],
  // Vue types are hand-written in src/vue/index.d.ts, so bundle that file
  // instead of generating declarations from the .vue components.
  dts: {
    entry: {
      index:         "src/core/index.ts",
      "react/index": "src/react/index.ts",
      "vue/index":   "src/vue/index.d.ts",
    },
  },
  // Shares the core code between entry points instead of bundling a copy
  // into each one (experimental for cjs in tsup)
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "vue"],
  tsconfig: "tsconfig.build.json",
  esbuildPlugins: [vue()],
});
