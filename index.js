const elastic = require('./elasticsearch'),
  { loadNuxt, build } = require('nuxt'),
  app = require('express')(),
  bodyParser = require('body-parser'),
  // Check if we need to run Nuxt in development mode
  isDev = process.env.NODE_ENV !== 'production',
  port = process.env.PORT || 3000;

elastic.init().then(() => {
  // Get a ready to use Nuxt instance
  return loadNuxt(isDev ? 'dev' : 'start').then(nuxt => {

    // Enable live build & reloading on dev
    if (isDev) {
      return build(nuxt).then(() => nuxt);
    }

    return Promise.resolve(nuxt);
  });
}).then(nuxt => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(nuxt.render);
  app.listen(port, '0.0.0.0');
  console.log('Server listening on `localhost:' + port + '`.');
}).catch(error => console.error('There was an error while starting elastic', error));
