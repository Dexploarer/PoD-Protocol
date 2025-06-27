import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

export default {
  input: {
    index: "src/index.ts",
    client: "src/client.ts",
    types: "src/types.ts",
    utils: "src/utils.ts",
    "services/agent": "src/services/agent.ts",
    "services/message": "src/services/message.ts",
    "services/channel": "src/services/channel.ts",
    "services/escrow": "src/services/escrow.ts",
    "services/analytics": "src/services/analytics.ts",
    "services/discovery": "src/services/discovery.ts",
    "services/ipfs": "src/services/ipfs.ts",
    "services/zk-compression": "src/services/zk-compression.ts",
    "services/jito-bundles": "src/services/jito-bundles.ts",
    "services/session-keys": "src/services/session-keys.ts",
  },
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      entryFileNames: "[name].js",
    },
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      entryFileNames: "[name].esm.js",
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      preventAssignment: true,
    }),
    json(),
    nodeResolve({
      browser: false,
      preferBuiltins: true,
      exportConditions: ['node'],
    }),
    commonjs({
      include: ["node_modules/**"],
      defaultIsModuleExports: 'auto',
      esmExternals: true,
      requireReturnsDefault: 'auto',
      ignoreDynamicRequires: true,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      outputToFilesystem: true,
      exclude: ["**/*.test.ts", "node_modules/**"],
      noEmitOnError: false,
      compilerOptions: {
        composite: false,
        incremental: false,
        skipLibCheck: true,
        target: "ES2020",
        module: "ESNext",
      },
    }),
  ],
  external: [
    "@solana/web3.js",
    "@solana-program/system", 
    "@solana-program/token",
    "@solana-program/compute-budget",
    "@solana/spl-token",
    "@coral-xyz/anchor",
    "@coral-xyz/borsh",
    "@solana/wallet-adapter-base",
    "@lightprotocol/compressed-token",
    "@lightprotocol/stateless.js",
    "helia",
    "@helia/unixfs",
    "@helia/json",
    "multiformats",
    "keccak",
    "node-domexception",
    "ws",
  ],
};
