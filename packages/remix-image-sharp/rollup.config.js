import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import versionInjector from "rollup-plugin-version-injector";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "build/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: ["fs", "path", "stream", "child_process", "os", "sharp"],
    plugins: [
      versionInjector({
        injectInTags: {
          fileRegexp: /\.(js|jsx|ts|tsx)$/,
          tagId: "VI",
          dateFormat: "mmmm d, yyyy HH:MM:ss",
        },
      }),
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      resolve({ preferBuiltins: false }),
      commonjs(),
      terser({
        keep_fnames: true,
      }),
    ],
  },
];
