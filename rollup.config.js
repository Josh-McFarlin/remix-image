import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

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
      }),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
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
    external: ["fs", "path"],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      resolve({ preferBuiltins: false }),
      commonjs(),
      terser(),
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
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      resolve({ preferBuiltins: false }),
      commonjs(),
      replace({
        preventAssignment: true,
        include: ["node_modules/jpeg-js/**/*.js"],
        values: {
          "Buffer.from": "new Uint8Array",
        },
      }),
      terser(),
    ],
  },
];
