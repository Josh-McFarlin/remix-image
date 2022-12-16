import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import copy from "rollup-plugin-copy";
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
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript({
        tsconfigOverride: {
          exclude: ["node_modules", "build", "tests"],
        },
      }),
      nodePolyfills({
        sourceMap: true,
        include: null,
      }),
      commonjs(),
      replace({
        sourceMap: true,
        preventAssignment: false,
        "import.meta.url": JSON.stringify("http://localhost"),
        "self.location.href": JSON.stringify("http://localhost"),
        "await simd": "(() => false)",
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
      copy({
        copyOnce: true,
        targets: [
          {
            src: "../../node_modules/@jsquash/avif/codec/enc/avif_enc.wasm",
            dest: ".",
            rename: "avif_enc.wasm",
          },
          {
            src: "../../node_modules/@jsquash/avif/codec/dec/avif_dec.wasm",
            dest: ".",
            rename: "avif_dec.wasm",
          },
          {
            src: "../../node_modules/@jsquash/jpeg/codec/enc/mozjpeg_enc.wasm",
            dest: ".",
            rename: "jpeg_enc.wasm",
          },
          {
            src: "../../node_modules/@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm",
            dest: ".",
            rename: "jpeg_dec.wasm",
          },
          {
            src: "../../node_modules/@jsquash/png/codec/squoosh_png_bg.wasm",
            dest: ".",
            rename: "png.wasm",
          },
          {
            src: "../../node_modules/@jsquash/webp/codec/enc/webp_enc.wasm",
            dest: ".",
            rename: "webp_enc.wasm",
          },
          {
            src: "../../node_modules/@jsquash/webp/codec/dec/webp_dec.wasm",
            dest: ".",
            rename: "webp_dec.wasm",
          },
          {
            src: "../../node_modules/@jsquash/resize/lib/resize/squoosh_resize_bg.wasm",
            dest: ".",
            rename: "resize.wasm",
          },
        ],
      }),
    ],
  },
];
