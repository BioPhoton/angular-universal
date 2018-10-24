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
import {STATIC_ROUTES_FOR_PRERENDER} from './projects/universal-app/src/app/app-routing';


interface Params {
  fullPath: string;
  route: string;
  html?: string;
  filename?: string;
}
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(DIST_FOLDER, 'angular-universal-server', 'main'));

const BROWSER_FOLDER = join(process.cwd(), join('dist', 'angular-universal'));

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');

const getFilename = (route: string): string => {
  if (route !== '/') {
    return route.split('').slice(1).join('') + '.html';
  }
  return 'index.html';
};

// Iterate each route path
STATIC_ROUTES_FOR_PRERENDER.forEach(route => {
  const fullPath = join(BROWSER_FOLDER);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }
  const resolvedParams = Promise.resolve<Params>({fullPath, route});

  // Rendered angular app.
  resolvedParams
    .then((p) =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index as string,
        url: p.route as string,
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP)
        ]
      }).then((html) => ({html, ...p}))
    )
    // Writes rendered HTML to [name].html, replacing the file if it already exists.
    .then((p: Params) => {
      const filename = getFilename(p.route);
      writeFileSync(join(p.fullPath, filename), p.html);
      return {...p, filename};
    })
    // Inject critical css
    .then((p: Params) => {
      const opt: CriticalCssOptions = {
        inline: true,
        base: p.fullPath,
        src: join(p.fullPath, p.filename),
        dest: p.filename,
        width: 1300,
        height: 900
      };
      return injectCriticalCss(opt);
    })
    .catch(e => console.log('THIS IS AN ERROR', e))
  ;
});

