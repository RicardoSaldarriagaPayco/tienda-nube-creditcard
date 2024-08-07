// vite.config.ts
import { defineConfig } from "file:///home/epayco-21/Escritorio/github/tienda-nube-creditcard/.yarn/__virtual__/vite-virtual-a05265ae08/0/cache/vite-npm-5.3.5-3cbb728ee4-5412700159.zip/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///home/epayco-21/Escritorio/github/tienda-nube-creditcard/.yarn/__virtual__/vite-plugin-node-polyfills-virtual-c3c7916e67/0/cache/vite-plugin-node-polyfills-npm-0.22.0-b49f4f8ad0-c08d3df0d5.zip/node_modules/vite-plugin-node-polyfills/dist/index.js";
import path from "path";
import svgr from "file:///home/epayco-21/Escritorio/github/tienda-nube-creditcard/.yarn/__virtual__/vite-plugin-svgr-virtual-2dc02a7bde/0/cache/vite-plugin-svgr-npm-4.2.0-e0c6a7a1f0-8202c0b25c.zip/node_modules/vite-plugin-svgr/dist/index.js";
import react from "file:///home/epayco-21/Escritorio/github/tienda-nube-creditcard/.yarn/__virtual__/@vitejs-plugin-react-virtual-2fa6e3cc16/0/cache/@vitejs-plugin-react-npm-4.3.1-cbe92983ea-57872e0193.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/home/epayco-21/Escritorio/github/tienda-nube-creditcard/frontend";
var vite_config_default = defineConfig({
  optimizeDeps: {
    include: [
      "@nimbus-ds/patterns",
      "@nimbus-ds/components",
      "@nimbus-ds/styles"
    ]
  },
  plugins: [
    svgr(),
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lcGF5Y28tMjEvRXNjcml0b3Jpby9naXRodWIvdGllbmRhLW51YmUtY3JlZGl0Y2FyZC9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZXBheWNvLTIxL0VzY3JpdG9yaW8vZ2l0aHViL3RpZW5kYS1udWJlLWNyZWRpdGNhcmQvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZXBheWNvLTIxL0VzY3JpdG9yaW8vZ2l0aHViL3RpZW5kYS1udWJlLWNyZWRpdGNhcmQvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgXCJAbmltYnVzLWRzL3BhdHRlcm5zXCIsXG4gICAgICBcIkBuaW1idXMtZHMvY29tcG9uZW50c1wiLFxuICAgICAgXCJAbmltYnVzLWRzL3N0eWxlc1wiLFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBzdmdyKCksXG4gICAgcmVhY3QoKSxcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgQnVmZmVyOiB0cnVlLFxuICAgICAgICBnbG9iYWw6IHRydWUsXG4gICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVgsU0FBUyxvQkFBb0I7QUFDbFosU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFKbEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
