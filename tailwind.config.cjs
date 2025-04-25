module.exports = {
    content: [
      './src/**/*.{html,js,svelte,ts}',
      './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', // 🔥 bắt buộc
    ],
    theme: {
      extend: {
        colors: {
          primary: '#C45DFC',
        }
      }
    },
    plugins: [require('flowbite/plugin')], // 🔥 bắt buộc
  };
  