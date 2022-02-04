import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "build/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      postcss({
        modules: true,
        extract: path.resolve("build/styles.css"),
        // inject: true,
      }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      commonjs(),
      resolve(),
    ],
  },
  {
    input: "src/server/index.ts",
    output: [
      {
        file: "build/server.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ preferBuiltins: false }),
      commonjs(),
      // nodePolyfills({
      //   include: null,
      // }),
    ],
  },
  {
    input: "src/server/pure.ts",
    output: [
      {
        file: "build/serverPure.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ preferBuiltins: false }),
      commonjs(),
      nodePolyfills({
        include: null,
      }),
    ],
  },
];
