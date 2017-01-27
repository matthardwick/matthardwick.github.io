/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["images/1by1.png","73031b554fd75a3df2b54c9fc5d2d654"],["images/bg.png","30440af37393c0fd36fd63ab190c7e88"],["images/contact-bg.png","603c8395ce9779a58d98ab09f58ba13d"],["images/favicon/android-icon-144x144.png","60136d96642bbb7803316fbb53ac4c2a"],["images/favicon/android-icon-192x192.png","4b97927cc0606bf316285d2f28c8af91"],["images/favicon/android-icon-36x36.png","10f8a7fd494130ba99dfba2592d67f43"],["images/favicon/android-icon-48x48.png","e349bbc4e4d1ef6e0204c63eeb2217f8"],["images/favicon/android-icon-72x72.png","e3825d38d20cec4d45594f1588462b0e"],["images/favicon/android-icon-96x96.png","aaf9c6e5fb3386eda1eafff28ba76573"],["images/favicon/apple-icon-114x114.png","ef15ce0c91647035a7d8513feb5a5af2"],["images/favicon/apple-icon-120x120.png","0ddf1d9495c7b812058ea7c63c9631bd"],["images/favicon/apple-icon-144x144.png","60136d96642bbb7803316fbb53ac4c2a"],["images/favicon/apple-icon-152x152.png","eac57ba160a0474b0de3936fdfb65b78"],["images/favicon/apple-icon-180x180.png","9eb61925b6f32cc0d01b1abb582cd03e"],["images/favicon/apple-icon-57x57.png","1696fcf35fb609710797ecb56e0e1168"],["images/favicon/apple-icon-60x60.png","42e7903ab61eeab6e659966eb605871b"],["images/favicon/apple-icon-72x72.png","e3825d38d20cec4d45594f1588462b0e"],["images/favicon/apple-icon-76x76.png","90e9f8934ecce48ef34a639c3d5945c7"],["images/favicon/apple-icon-precomposed.png","4b97927cc0606bf316285d2f28c8af91"],["images/favicon/apple-icon.png","4b97927cc0606bf316285d2f28c8af91"],["images/favicon/browserconfig.xml","653d077300a12f09a69caeea7a8947f8"],["images/favicon/favicon-16x16.png","d8c67a4e34187a0acd04e6154c0f3c2e"],["images/favicon/favicon-32x32.png","49b16865f716cf13ae2d673c7c046333"],["images/favicon/favicon-96x96.png","aaf9c6e5fb3386eda1eafff28ba76573"],["images/favicon/favicon.ico","72ee574a4933030d28cfd5e66fe62039"],["images/favicon/manifest.json","b58fcfa7628c9205cb11a1b2c3e8f99a"],["images/favicon/ms-icon-144x144.png","60136d96642bbb7803316fbb53ac4c2a"],["images/favicon/ms-icon-150x150.png","bea5b190f504c25ea9aff0a8b3899b56"],["images/favicon/ms-icon-310x310.png","b92b107aa7f656b2b425525dcf2630d3"],["images/favicon/ms-icon-70x70.png","477ff4f00a37277d78bf204227690f33"],["images/fresno.png","d80c99d04c843b783ca63ffc42b758ae"],["images/matt-about.png","bffa37d258fe14d28fb7eac1d38af990"],["images/matt-profile-pic-adjusted.jpg","2a6225ba09cbc8c55dbb12be848123e0"],["images/matt-profile-pic.jpg","1b4f1fb7850508f5cccfb609125d83c3"],["images/matt-profile-pic.png","d794daaec8741c615b5bca4daa1f6e25"],["images/mh-logo.png","469e168920c22a0d42918b292c7bb349"],["images/mh-logo.svg","d6f23fb007e21066ea2a1264697f1380"],["images/portfolio/maps-screenshot.png","ce5c488092505cf7bb471c71133beec5"],["images/portfolio/mu-blog-screenshot.png","ab3394125a0f52af25485b31a904a683"],["images/portfolio/wtgg-screenshot.png","682c87f7eecd79c91cf8418ca31b4f37"],["images/skills-bg.png","ff103602d7297d1a3a69fb3f5ec40793"],["images/skills/angular.svg","44b510ef3b9716ab36b410337da0a77d"],["images/skills/bootstrap.svg","ba60afcb86134350430a62670e4224b6"],["images/skills/css.svg","f9f7207996639a1c4ae1f0afef21d75a"],["images/skills/git.svg","0b0133b398d6c9bcbaf9bf3a30974cb4"],["images/skills/google-cloud.svg","a4de3abce541943ef47656b2501b8fe1"],["images/skills/html.svg","4358ecddf1418bbca46d1500f936dc96"],["images/skills/illustrator.svg","5c64e0d856a27f65c254db685f6053cc"],["images/skills/javascript.svg","b012529ab0ac6954f6ae34038bb9ebf6"],["images/skills/jquery.svg","28ea44d8f2d681bc3eca6e4b0d761cc7"],["images/skills/knockout.svg","2fd1e3ee10b176be83298f08306d60f9"],["images/skills/meteor.svg","71474a3ffb2d8bc44f0643e684bb1cc9"],["images/skills/nodejs.svg","1c59d9ea5bd3d964e201c819df3549a8"],["images/skills/photoshop.svg","55388d905b45d12ed39ad7eb2e179336"],["images/skills/polymer.svg","7b79963c6e2df67640104fe420c39a0c"],["images/skills/postgresql.svg","4cd1eaefa70347d3aafb5c22391a2282"],["images/skills/python.svg","03a1b1703ec89aed9297644383a27050"],["images/skills/react.svg","06ed421a4a9db14424d7e9283a11c6e4"],["images/skills/ruby.svg","389e3b78de471dab5a4162d3b7c7c458"],["images/skills/sass.svg","ec5c12a6add50f1d228830c5def9e5dc"],["images/skills/vue.svg","ae6b2ae4942f7e82b75abfd684cdac9e"],["images/skills/wordpress.svg","2676e15e95303b82de6012d14d7ff0b8"],["index.html","8309c79fa6200bef04efb92ba9c386fb"],["scripts/main.min.js","fded4b1046d54d12ba3f0dcc051b058b"],["scripts/sw/runtime-caching.js","e3e34dcb62b5d62453b9215961585488"],["scripts/sw/sw-toolbox.js","e7e54a466864d42dcccc8c3f80a91d1f"],["styles/main.css","ab961b82c90f28462d96797ea7729d97"],["styles/normalize.css","fd114c44db5a25687f51934024b822a6"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-web-starter-kit-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




