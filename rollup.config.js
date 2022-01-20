import peerDepsExternal from "rollup-plugin-peer-deps-external";
import multiInput from "rollup-plugin-multi-input";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import path from "path";

export default [
  {
    input: ["src/**/index.tsx", "src/**/index.ts", "!src/**/*.test.tsx"],
    output: [
      {
        dir: "build",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      multiInput({
        relative: "src",
      }),
      json(),
      postcss({
        modules: true,
        extract: path.resolve("build/styles.css"),
        inject: false,
      }),
      peerDepsExternal({
        includeDependencies: true,
      }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      commonjs(),
      resolve(),
    ],
  },
];
