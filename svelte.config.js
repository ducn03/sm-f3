import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// Import vô để config alias
import { defineConfig } from 'vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    
    alias: {
      // Thư mục lib đã có sẵn trong SvelteKit
      '$lib': path.resolve('./src/lib'),
      // Alias mới cho các thư mục khác
      '$f3': path.resolve('./src/f3'),
      '$core': path.resolve('./src/core')
    }
  }
};

export default config;