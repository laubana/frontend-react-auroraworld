import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 5173,
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  };
});
