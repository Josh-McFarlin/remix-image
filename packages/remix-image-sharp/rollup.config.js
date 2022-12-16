import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import { version } from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "build/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external: ["fs", "path", "stream", "child_process", "os", "sharp"],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({ preferBuiltins: false }),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      commonjs({ sourceMap: true }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        values: {
          __remix_image_version: version,
        },
      }),
      terser({
        sourceMap: true,
        keep_fnames: true,
      }),
    ],
  },
];
