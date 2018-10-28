import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import {getFilenameByRoute, getPrerenderedRoutes} from './utils';
import {PRERENDER_ROUTES} from './projects/universal-app/src/app/app.prerender-routes';
import {TRANSLATION_CONFIG} from './projects/universal-app/src/app/app.translation-config';

// Consts
const APP_NAME = 'universal-app';
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = join(DIST_FOLDER, APP_NAME);


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./universal-app-server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', APP_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', (express as any).static(APP_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use prerendered content
getPrerenderedRoutes(PRERENDER_ROUTES, TRANSLATION_CONFIG.languages)
  .forEach(route => {
  app.get('/' + route, (req, res) => {
    const file = getFilenameByRoute(route);
    res.sendFile(join(DIST_FOLDER, APP_NAME, file));
  });
});

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  global['window'] = {};
  global['window']['navigator'] = {};
  global['window']['navigator']['language'] = req['headers']['accept-language'];

  res.render('index', req);
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
