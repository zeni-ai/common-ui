import {defineConfig} from "vite";
import nodePolyfills from "rollup-plugin-polyfill-node";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {NodeModulesPolyfillPlugin} from "@esbuild-plugins/node-modules-polyfill";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import {esbuildCommonjs} from "@originjs/vite-plugin-commonjs";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    base: command == "serve" ? "/" : "/",
    plugins: [
      react(),
      tsconfigPaths(),
      svgrPlugin({svgrOptions: {icon: true}}),
      {
        name: "fix-node-globals-polyfill",
        setup(build) {
          build.onResolve({filter: /util\.js/}, ({path}) => ({path}));
        },
      },
    ],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed
        // by node-globals-polyfill
       util: "util",
        sys: "util",
        events: "rollup-plugin-node-polyfills/polyfills/events",
        stream: "rollup-plugin-node-polyfills/polyfills/stream",
        path: "rollup-plugin-node-polyfills/polyfills/path",
        querystring: "rollup-plugin-node-polyfills/polyfills/qs",
        punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
        url: "rollup-plugin-node-polyfills/polyfills/url",
        http: "rollup-plugin-node-polyfills/polyfills/http",
        https: "rollup-plugin-node-polyfills/polyfills/http",
        os: "rollup-plugin-node-polyfills/polyfills/os",
        assert: "rollup-plugin-node-polyfills/polyfills/assert",
        constants: "rollup-plugin-node-polyfills/polyfills/constants",
        _stream_duplex:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
        _stream_passthrough:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
        _stream_readable:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
        _stream_writable:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
        _stream_transform:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
        timers: "rollup-plugin-node-polyfills/polyfills/timers",
        console: "rollup-plugin-node-polyfills/polyfills/console",
        vm: "rollup-plugin-node-polyfills/polyfills/vm",
        zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
        tty: "rollup-plugin-node-polyfills/polyfills/tty",
        domain: "rollup-plugin-node-polyfills/polyfills/domain",
        // "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
        // "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      },
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          esbuildCommonjs(["react-calendar", "react-date-picker", "date-fns"]),
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    build: {
      commonjsOptions: {
        include: [/linked-dep/, /node_modules/],
      },
      rollupOptions: {
        plugins: [nodePolyfills()],
      },
    },
  };
});
