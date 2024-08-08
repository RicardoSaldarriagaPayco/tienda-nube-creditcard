import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
export default defineConfig({
    optimizeDeps: {
        include: [
            "@nimbus-ds/patterns",
            "@nimbus-ds/components",
            "@nimbus-ds/styles",
        ],
    },
    plugins: [
        svgr(),
        react(),
        nodePolyfills({
            globals: {
                Buffer: true,
                global: true,
                process: true,
            },
        }),
    ],
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});