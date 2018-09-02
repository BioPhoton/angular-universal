import {enableProdMode} from '@angular/core';
import {renderModuleFactory} from '@angular/platform-server';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import 'reflect-metadata';
// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import {STATIC_ROUTES} from './src/app/app.routing.module';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(DIST_FOLDER, 'angular-universal-server', 'main'));

const BROWSER_FOLDER = join(process.cwd(), join('dist', 'angular-universal'));

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
STATIC_ROUTES.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, 'prerendered', route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  })).then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
