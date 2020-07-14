const elastic = require('./elasticsearch'),
  { loadNuxt, build } = require('nuxt');

elastic.init().then(() => {
  // Check if we need to run Nuxt in development mode
  const isDev = process.env.NODE_ENV !== 'production';

  // Get a ready to use Nuxt instance
  return loadNuxt(isDev ? 'dev' : 'start').then(nuxt => {
    // Enable live build & reloading on dev
    if (isDev) {
      build(nuxt);
    }
  });
}).catch(error => console.error('There was an error while starting elastic', error));
