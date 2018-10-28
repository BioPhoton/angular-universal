import {enableProdMode} from '@angular/core';
import {renderModuleFactory} from '@angular/platform-server';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import 'reflect-metadata';
// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import {CriticalCssOptions, injectCriticalCss} from './inject-critical-css';
import {getFilenameByRoute} from './utils';

global['window'] = {};

interface Params {
  folderPath: string;
  route: string;
  html?: string;
  filename?: string;
}
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'universal-app';
const APP_SERVER_NAME = 'universal-app-server';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(DIST_FOLDER, APP_SERVER_NAME, 'main'));

const BROWSER_FOLDER = join(DIST_FOLDER, APP_NAME);

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');

export function prerenderPageAndSaveAsFile(folderPath, route): Promise<any> {
  // Make sure the directory structure is there
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  const resolvedParams = Promise.resolve<Params>({folderPath, route});

  return resolvedParams
    .then(renderApp)
    .then(writeToFile)
    .then(injectCriticalCssForFile)
    .catch(e => console.error('THIS IS AN ERROR', e));
}

// Rendered angular app
function renderApp(p) {
  return renderModuleFactory(AppServerModuleNgFactory, {
    document: index as string,
    url: p.route as string,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then((html) => ({html, ...p}));
}

// Writes rendered HTML to [name].html, replacing the file if it already exists.
function writeToFile(p: Params) {
  const filename = getFilenameByRoute(p.route);
  writeFileSync(join(p.folderPath, filename), p.html);
  return {...p, filename};
}

// Inject critical css
function injectCriticalCssForFile(p: Params) {
  const opt: CriticalCssOptions = {
    inline: true,
    base: p.folderPath,
    src: join(p.folderPath, p.filename),
    dest: p.filename,
    width: 1300,
    height: 900
  };
  return injectCriticalCss(opt);
}
