import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-polyfill-node";
// import copy from "rollup-plugin-copy";

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
    plugins: [
      peerDepsExternal(),
      json(),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      commonjs(),
      nodePolyfills({
        include: null,
      }),
      resolve({ preferBuiltins: false }),

      //terser(),
      // copy({
      //   targets: [
      //     {
      //       src: "node_modules/@imagemagick/magick-wasm/wasm/magick.wasm",
      //       dest: "build",
      //     },
      //   ],
      // }),
    ],
  },
];
