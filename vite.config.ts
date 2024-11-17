import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import { resolve } from 'path';
import packageJson from './package.json';
import fs from 'fs';



/** @type {import('tailwindcss').Config} */
export default defineConfig((config) => {
  const isProduction = config.mode === 'production';
  const manifestVersion = 2;
  const width = 600;
  const height = 1000;

  const manifest = {
    name: isProduction ? "Sai's Sheets" : "SS-Extension (DEV)",
    icon: isProduction ? "/icon2.png" : "/icon2-dev.png",
    version: isProduction ? packageJson.version : packageJson.version + "-dev",
    manifest_version: manifestVersion,
    action: {
      title: isProduction ? "Sheets" : 'Sheets (DEV)',
      icon: isProduction ? "/icon.png" : "/icon-dev.png",
      popover: "/",
      width: width,
      height: height
    }
  };

  const manifestPath = resolve(__dirname, 'public', 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    }
  }
})
