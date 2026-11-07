import { defineConfig } from "tsup";
import vue from "unplugin-vue/esbuild";

export default defineConfig([
  // Core + React — full DTS generation
  {
    entry: {
      index:         "src/core/index.ts",
      "react/index": "src/react/index.ts",
    },
    format: ["esm", "cjs"],
    // Vue types are bundled here too: this config's DTS step deletes every
    // .d.ts in dist, so they can't be emitted by the Vue config below.
    dts: {
      entry: {
        index:         "src/core/index.ts",
        "react/index": "src/react/index.ts",
        "vue/index":   "src/vue/index.d.ts",
      },
    },
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "vue"],
    tsconfig: "tsconfig.build.json",
  },

  // Vue — DTS disabled (types are hand-written in src/vue/index.d.ts)
  {
    entry: {
      "vue/index": "src/vue/index.ts",
    },
    format: ["esm", "cjs"],
    dts: false,
    splitting: false,
    sourcemap: true,
    external: ["vue"],
    tsconfig: "tsconfig.build.json",
    esbuildPlugins: [vue()],
  },
]);