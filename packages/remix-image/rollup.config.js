import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import { version } from "./package.json";

const external = ["fs", "path", "react", "react-dom"];

const tsSettings = {
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    exclude: ["node_modules", "build", "tests"],
  },
};

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "build/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve(),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        values: {
          __remix_image_version: version,
        },
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
  {
    input: "src/server/index.ts",
    output: [
      {
        file: "build/server/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        values: {
          __remix_image_version: version,
        },
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
  {
    input: "src/server/pure.ts",
    output: [
      {
        file: "build/server/pure.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        include: ["node_modules/jpeg-js/**/*.js"],
        values: {
          "Buffer.from": "new Uint8Array",
        },
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        values: {
          __remix_image_version: version,
        },
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
];
