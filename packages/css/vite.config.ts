import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['@vanilla-extract/css', '@vanilla-extract/recipes', '@vanilla-extract/sprinkles'],
    },
  },
  plugins: [dts(), vanillaExtractPlugin()],
});
