// Iterate each route path
import {PRERENDER_ROUTES} from './projects/universal-app/src/app/app.prerender-routes';
import {TRANSLATION_CONFIG} from './projects/universal-app/src/app/app.translation-config';
import {getPrerenderedRoutes} from './utils';
import {prerenderPageAndSaveAsFile} from './prerender';
import {join} from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'universal-app';
const BROWSER_FOLDER = join(DIST_FOLDER, APP_NAME);

getPrerenderedRoutes(PRERENDER_ROUTES, TRANSLATION_CONFIG.languages)
  .forEach(route => {
    const folderPath = join(BROWSER_FOLDER);
    prerenderPageAndSaveAsFile(folderPath, route)
      .catch();
  });
