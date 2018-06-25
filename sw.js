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

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404/index.html","ab08dd76794ce1068d3361d80bfef282"],["/about/index.html","5e9d0ada2bb21bf73f6c4f6454ec5ca1"],["/assets/css/main.css","533a935e31418fedf0d0f03d2e1eb398"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","624f7739b9e8cd08fe49bdbf8dfc7dad"],["/assets/img/icons/android-chrome-256x256.png","27acfad929c2a787d3222ebbfcd02fa3"],["/assets/img/icons/apple-touch-icon.png","a0fa2746f0e51291e0c38e747425ccaf"],["/assets/img/icons/favicon-16x16.png","be2a4b34f93c3f0a46e20ba9e9ada3c6"],["/assets/img/icons/favicon-32x32.png","2dd82819d16d881983eda1e71a3854eb"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","c2d5a9e3beb1e5242765cc35281a342b"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/choosing_reward_based_training.jpg","b19d24d11c4ed49cfe8239323a0a2149"],["/assets/img/posts/choosing_reward_based_training_lg.jpg","6aab327f60faea35e75fcd6065a41178"],["/assets/img/posts/choosing_reward_based_training_md.jpg","19bb1d0509665a497587895df384a88b"],["/assets/img/posts/choosing_reward_based_training_placehold.jpg","ecc4bacabefceaf1d780d47f526eaa8f"],["/assets/img/posts/choosing_reward_based_training_sm.jpg","8c227562e918eb7c74a1c4832dd6f8b7"],["/assets/img/posts/choosing_reward_based_training_thumb.jpg","c0760bd3bc2a10b8b6c5b632a77f298d"],["/assets/img/posts/choosing_reward_based_training_thumb@2x.jpg","48bdf3241984002794234643a0ace9bb"],["/assets/img/posts/choosing_reward_based_training_xs.jpg","ccc3f62f103a54e182bde18d2c4026c8"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/hero_image.jpg","a79c2bffcdbb89aa297d212bddd550ab"],["/assets/img/posts/hero_image_lg.jpg","e54ba710d39404ecb5d97048ea24017e"],["/assets/img/posts/hero_image_md.jpg","f3c41abc0a96d42e75100d2e55807c31"],["/assets/img/posts/hero_image_placehold.jpg","cac1ecedc9ca3baee92df1b6d309b107"],["/assets/img/posts/hero_image_sm.jpg","7a553cd5ea051abba1178dd408b95a7a"],["/assets/img/posts/hero_image_thumb.jpg","5783743d88878326a26e24d00f24362b"],["/assets/img/posts/hero_image_thumb@2x.jpg","dffb09e0a43b95a47399c7c873dcb782"],["/assets/img/posts/hero_image_xs.jpg","16b453d8567ea2053a4bc87819fe85cd"],["/assets/img/posts/learning_about_dog_training_hero.jpg","7168e61906a1b06db4cc39166d55b2f8"],["/assets/img/posts/learning_about_dog_training_hero_lg.jpg","7483d57e44da9c726a9c5a04abfa0e3a"],["/assets/img/posts/learning_about_dog_training_hero_md.jpg","bb8107c8885d118d28993ce39a5b87de"],["/assets/img/posts/learning_about_dog_training_hero_placehold.jpg","d0413841a3653039c8ca51c2b450d0f8"],["/assets/img/posts/learning_about_dog_training_hero_sm.jpg","a5c9494b71df3cdf9df900f6eb979b49"],["/assets/img/posts/learning_about_dog_training_hero_thumb.jpg","0194f63e855282654e415f3aa3189e87"],["/assets/img/posts/learning_about_dog_training_hero_thumb@2x.jpg","88aaf295dccc91bdf41cc076ff6ce8e5"],["/assets/img/posts/learning_about_dog_training_hero_xs.jpg","27917668029e5d47a77ffa65d73407a8"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/img/posts/what.jpg","15d697336d6a545933ca149bcaa78ac1"],["/assets/img/posts/why.jpg","70a40732fd27fc707d7a2aa2827e979f"],["/assets/img/posts/why_hero.jpg","8e842d8777a4e03c8f6f318d72f05249"],["/assets/img/posts/why_hero_lg.jpg","f3740b4117ba94c982f933bc27cfb3b9"],["/assets/img/posts/why_hero_md.jpg","bac4fd38071174d8ee24a588d339e526"],["/assets/img/posts/why_hero_placehold.jpg","b6d136563debe0c9384c93eedaeffae9"],["/assets/img/posts/why_hero_sm.jpg","9345f8f09b15d41cb5f808deaca54822"],["/assets/img/posts/why_hero_thumb.jpg","8b456457b14e4c36d435620aeae1fcd6"],["/assets/img/posts/why_hero_thumb@2x.jpg","4f95c20b3edb1c15d9f4feb30de9b314"],["/assets/img/posts/why_hero_xs.jpg","477fe1d1e581250abd894e17bb242792"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/categories/index.html","aa28ade0d7f7020a7b61b05bdcf1239d"],["/choosing-reward-based-training/index.html","197875256e531c2c512c959f8682f690"],["/contact/index.html","671e7e30ed51b5df86f1457de5745159"],["/index.html","c24307b9ce0dd0a0a3498bece5854ab5"],["/learning_about_dog_training/index.html","7c0e562d310e03c9fc5c66b6d8559970"],["/sw.js","cf1b3e3d6b8da4fe588cf5c71c95129a"],["/why/index.html","63a38e70208dd0f2fe851f3a31d4e6a3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
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

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

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


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







