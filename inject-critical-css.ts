import {generate} from 'critical';

export interface CriticalCssOptions {
  // object	false	Inline critical-path CSS using filamentgroup's loadCSS. Pass an object to configure inline-critical
  inline?: boolean;
  // path.dirname(src) or process.cwd()	Base directory in which the source and destination are to be written
  base?: string;
  // HTML source to be operated against. This option takes precedence over the src option.
  // @TODO either src or html are required !!! => fix this inn typing
  html?: string;
  // HTML source folder. Required to compute relative asset paths in conjunction with the html option
  folder?: string;
  // []	An array of paths to css files, or an array of Vinyl file objects.
  css?: string[];
  // Location of the HTML source to be operated against
  src: string;
  // Location of where to save the output of an operation (will be relative to base if no absolute path is set)
  dest?: string;
  // ''	Subfolder relative to base directory. Only relevant without src (if raw html is provided) or if the destination is outside base
  destFolder?: string;
  // Target file to store the generated critical-path styles
  styleTarget?: string;
  // (integer) 900	Width of the target viewport
  width?: number;
  // (integer)	1300	Height of the target viewport
  height?: number;
  // An array of objects containing height and width. Takes precedence over width and height if set
  dimensions?: { height: number, width: number }[];
  // false	Enable minification of generated critical-path CSS
  minify?: boolean;
  // false	Remove the inlined styles from any stylesheets referenced in the HTML. It generates new references based on extracted content so it's safe to use for multiple HTML files referencing the same stylesheet. Use with caution. Removing the critical CSS per page results in a unique async loaded CSS file for every page. Meaning you can't rely on cache across multiple pages
  extract?: boolean;
  // false	Inline images
  inlineImages?: boolean;
  // 	List of directories/urls where the inliner should start looking for assets
  assetPaths?: string[];
  // (integer)	10240	Sets a max file size (in bytes) for base64 inlined images
  maxImageFileSize?: number;
  // (integer)	30000	Sets a maximum timeout for the operation
  timeout?: number;
  // Path to prepend CSS assets with. You must make this path absolute if you are going to be using critical in multiple target files in disparate directory depths. (eg. targeting both /index.html and /admin/index.html would require this path to start with / or it wouldn't work.)
  pathPrefix?: string;
  // Force include CSS rules. See penthouse#usage.
  include?: string[];
  // Ignore CSS rules. See filter-css for usage examples.
  ignore?: string[];
  // object	{}	Ignore options. See filter-css#options.
  ignoreOptions?: {};
  // User agent to use when fetching a remote src
  userAgent?: string;
  // Configuration options for penthouse.
  penthouse?: {};
  // undefined	RFC2617 basic authorization: user
  user?: string;
  // undefined	RFC2617 basic authorization: pass
  pass?: string;
}

export function injectCriticalCss(opt: CriticalCssOptions): Promise<any> {
  return generate(opt)
    .catch((e) => {
      console.log('error with file ' + opt.dest, e);
    });
}
