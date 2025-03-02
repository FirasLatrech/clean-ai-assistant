import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Set base to './' to use relative paths in the build output
    base: './',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define env variables to expose to the client
    define: {
      // Expose only VITE_ prefixed env variables
      'import.meta.env.VITE_CLAUDE_API_KEY': JSON.stringify(env.VITE_CLAUDE_API_KEY || ''),
    },
    build: {
      // Ensure the build is optimized for Chrome extension
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // Ensure proper chunking for extension
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-avatar',
              // Add other UI components as needed
            ],
          },
          // Ensure asset paths are relative for extension
          assetFileNames: 'assets/[name].[ext]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      // Ensure source maps for easier debugging
      sourcemap: mode === 'development',
      // Minify for production
      minify: mode === 'production',
    },
  };
});
