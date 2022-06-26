import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
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
      typescript({
        useTsconfigDeclarationDir: true,
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
        file: "build/server/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: ["fs", "path"],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
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
        file: "build/server/pure.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
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
