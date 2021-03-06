/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'node_modules/@angular/animations/bundles/animations.umd.min.js',
      '@angular/animations/browser':'node_modules/@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'socket.io-client': 'node_modules/socket.io-client/dist/socket.io.js',
      "ng2-charts": "node_modules/ng2-charts",
      "chart.js": "node_modules/chart.js/dist",
      "@agm/core": "node_modules/@agm/core/core.umd.js",
      'angular2-busy': 'npm:angular2-busy',
      'hammerjs': 'npm:hammerjs/hammer.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'socket.io-client': {"defaultExtension": "js"},
      "ng2-charts": { main: "ng2-charts.js", defaultExtension: "js" },
      "chart.js": { main: "Chart.bundle.js", defaultExtension: "js"},
      'angular2-busy': {
            main: './index.js',
            defaultExtension: 'js'
        }
    }
  });
})(this);
