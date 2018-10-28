export function getFilenameByRoute(route: string): string {
  if (route !== '') {
    return route.split('/').join('__') + '.html';
  }
  return 'index.html';
}

export function getPrerenderedRoutes(staticRoutes: string[], languages?: string[]): string[] {
  if (languages) {
    return staticRoutes
      // map '' to index
      .map(r => r === '' ? 'index' : r )
      // prepend ever route with the language
      .map(r => languages.map(l => l + '/' + r))
      .reduce((a: string[], i: string[]): string[] => [...a, ...i], []);
  }
  return staticRoutes;
}
