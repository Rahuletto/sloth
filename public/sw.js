if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let n={};const r=e=>i(e,c),o={module:{uri:c},exports:n,require:r};a[c]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(t(...e),n)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts("fallback-TNjobgKVpYS6WXK7aYlc1.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"891bf2f88137697dacb133be2f803c68"},{url:"/_next/static/TNjobgKVpYS6WXK7aYlc1/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/TNjobgKVpYS6WXK7aYlc1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/181.57ef75fae3f50e23.js",revision:"57ef75fae3f50e23"},{url:"/_next/static/chunks/1816.57ee4167917a58da.js",revision:"57ee4167917a58da"},{url:"/_next/static/chunks/2291-ddac44cb98414bb3.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/2294.f7dc7090c1ab2b11.js",revision:"f7dc7090c1ab2b11"},{url:"/_next/static/chunks/2314.1a4513f419600575.js",revision:"1a4513f419600575"},{url:"/_next/static/chunks/2389.f27de9e174ca2214.js",revision:"f27de9e174ca2214"},{url:"/_next/static/chunks/2812.f7898546f16987a7.js",revision:"f7898546f16987a7"},{url:"/_next/static/chunks/2998-506006106614f0b9.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/30a37ab2-c5460e76d42efb60.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/3359-6b45225a96c5ccd4.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/3598.fafd231b83e904c3.js",revision:"fafd231b83e904c3"},{url:"/_next/static/chunks/3790.9bcc1a4960ba2ad3.js",revision:"9bcc1a4960ba2ad3"},{url:"/_next/static/chunks/3834.b594c8eb91a1ce9b.js",revision:"b594c8eb91a1ce9b"},{url:"/_next/static/chunks/3d47b92a.735906b88d7356e1.js",revision:"735906b88d7356e1"},{url:"/_next/static/chunks/4148.ad13eaa1be313261.js",revision:"ad13eaa1be313261"},{url:"/_next/static/chunks/4253.5ca0c051afc23e22.js",revision:"5ca0c051afc23e22"},{url:"/_next/static/chunks/4289.549ec2c839e8c42f.js",revision:"549ec2c839e8c42f"},{url:"/_next/static/chunks/44.a1d24e4a9df18c54.js",revision:"a1d24e4a9df18c54"},{url:"/_next/static/chunks/4520.2419c67a6e70dc9b.js",revision:"2419c67a6e70dc9b"},{url:"/_next/static/chunks/4610.d2b50810cc949d56.js",revision:"d2b50810cc949d56"},{url:"/_next/static/chunks/4648.c8aaf12b9dde0d85.js",revision:"c8aaf12b9dde0d85"},{url:"/_next/static/chunks/4682.98f77f30af5b9b55.js",revision:"98f77f30af5b9b55"},{url:"/_next/static/chunks/46be18a3-3573a4bc94dcce86.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/479ba886.a4fa4fccfdede733.js",revision:"a4fa4fccfdede733"},{url:"/_next/static/chunks/4872.20f741cba8b66a3c.js",revision:"20f741cba8b66a3c"},{url:"/_next/static/chunks/5364.c87cb9a6d1012ade.js",revision:"c87cb9a6d1012ade"},{url:"/_next/static/chunks/53c13509-154bb07d8362e638.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/5409.73bde0802ed1d3a4.js",revision:"73bde0802ed1d3a4"},{url:"/_next/static/chunks/5667.6b86dd08343eccb4.js",revision:"6b86dd08343eccb4"},{url:"/_next/static/chunks/5766.1006a486492f7f38.js",revision:"1006a486492f7f38"},{url:"/_next/static/chunks/59650de3-54169238abff9d48.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/5e22fd23-5dc182cd1d22e815.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/6035.193ae2b5c788249c.js",revision:"193ae2b5c788249c"},{url:"/_next/static/chunks/6532.44c68ff793a0fa6f.js",revision:"44c68ff793a0fa6f"},{url:"/_next/static/chunks/6533.c8de8d222536ab39.js",revision:"c8de8d222536ab39"},{url:"/_next/static/chunks/6648-012f0bb0f4117045.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/6672.78990914273cf741.js",revision:"78990914273cf741"},{url:"/_next/static/chunks/6804-f1c2ea243bad45d9.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/6859-4fed69b0e6f8cf09.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/7023-da1d5c0721830a6b.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/77-07709d6af5e73c62.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/795d4814.d62051c6053f8641.js",revision:"d62051c6053f8641"},{url:"/_next/static/chunks/7a49ec60.13cf94d3abdcec5b.js",revision:"13cf94d3abdcec5b"},{url:"/_next/static/chunks/8334.535b621f028166a2.js",revision:"535b621f028166a2"},{url:"/_next/static/chunks/8482.99ee11cbefb5b174.js",revision:"99ee11cbefb5b174"},{url:"/_next/static/chunks/8534-d0b8e443a496cd9d.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/8880.e3b1a13b8fc6beb4.js",revision:"e3b1a13b8fc6beb4"},{url:"/_next/static/chunks/8e1d74a4.a7cda564c1b9d80e.js",revision:"a7cda564c1b9d80e"},{url:"/_next/static/chunks/9060-e391c31e027811a4.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/927.7fadd6e37e93601c.js",revision:"7fadd6e37e93601c"},{url:"/_next/static/chunks/942.137e19f493b411a7.js",revision:"137e19f493b411a7"},{url:"/_next/static/chunks/94730671-bcbb950a52b0b81b.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/970.28a4192afbd79d80.js",revision:"28a4192afbd79d80"},{url:"/_next/static/chunks/9896.a108c64a197b4252.js",revision:"a108c64a197b4252"},{url:"/_next/static/chunks/9c4e2130-9883ae383375a9dc.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/_not-found/page-50a067835545a941.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/forgot/loading-70f2c1be1cc5c9cb.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/forgot/page-fd078c3bd35ca3e5.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/loading-1dd0424945703c42.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/logout/loading-45d77ed93909aa5e.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/logout/page-adbbaaeb5102d741.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/page-634bdf3d101e4266.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/verify/loading-f0059f1a5bdc9055.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/auth/verify/page-28877a164bcaa72b.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/home/page-ef0028780531f562.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/layout-d6245c5daa125f92.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/loading-81104fbc6524c117.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/not-found-36d6a52a8399d5ba.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/notes/%5Bid%5D/cards/page-d4f1d79a6b559b45.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/notes/%5Bid%5D/page-70220a84d0c51690.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/notes/%5Bid%5D/quiz/page-6c6eab0a53acc9d6.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/notes/loading-b4feda2c1380dc6b.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/notes/page-dd08f45bc834389d.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/offline/page-a74a4278f7dc3bd5.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/app/page-dc252e33648ab6fc.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/b536a0f1.87d9bf2f322c2231.js",revision:"87d9bf2f322c2231"},{url:"/_next/static/chunks/b563f954.64b50133b2be4afc.js",revision:"64b50133b2be4afc"},{url:"/_next/static/chunks/bc9e92e6-660a2fa6e88ae3ff.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/c916193b.1b9876c5b607e985.js",revision:"1b9876c5b607e985"},{url:"/_next/static/chunks/d3ac728e.7257f5ac135c1073.js",revision:"7257f5ac135c1073"},{url:"/_next/static/chunks/eeac573e-e86f8317246eb6ff.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/f8025e75-6284e1cdf6ab6044.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/f97e080b-47edb51187e37cb1.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/fd9d1056-306e4b8822524073.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/main-2d284b58375bc891.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/main-app-b58668b06162efea.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e67164f064c60555.js",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/_next/static/css/9cf82a37ea801a10.css",revision:"9cf82a37ea801a10"},{url:"/_next/static/css/b22d8e1e7334b057.css",revision:"b22d8e1e7334b057"},{url:"/_next/static/media/66f30814ff6d7cdf.p.woff2",revision:"addf0d443087aa4b985f763c80182017"},{url:"/_next/static/media/KaTeX_AMS-Regular.1608a09b.woff",revision:"1608a09b"},{url:"/_next/static/media/KaTeX_AMS-Regular.4aafdb68.ttf",revision:"4aafdb68"},{url:"/_next/static/media/KaTeX_AMS-Regular.a79f1c31.woff2",revision:"a79f1c31"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.b6770918.woff",revision:"b6770918"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.cce5b8ec.ttf",revision:"cce5b8ec"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.ec17d132.woff2",revision:"ec17d132"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.07ef19e7.ttf",revision:"07ef19e7"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.55fac258.woff2",revision:"55fac258"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.dad44a7f.woff",revision:"dad44a7f"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.9f256b85.woff",revision:"9f256b85"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.b18f59e1.ttf",revision:"b18f59e1"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.d42a5579.woff2",revision:"d42a5579"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.7c187121.woff",revision:"7c187121"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.d3c882a6.woff2",revision:"d3c882a6"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.ed38e79f.ttf",revision:"ed38e79f"},{url:"/_next/static/media/KaTeX_Main-Bold.b74a1a8b.ttf",revision:"b74a1a8b"},{url:"/_next/static/media/KaTeX_Main-Bold.c3fb5ac2.woff2",revision:"c3fb5ac2"},{url:"/_next/static/media/KaTeX_Main-Bold.d181c465.woff",revision:"d181c465"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.6f2bb1df.woff2",revision:"6f2bb1df"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.70d8b0a5.ttf",revision:"70d8b0a5"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.e3f82f9d.woff",revision:"e3f82f9d"},{url:"/_next/static/media/KaTeX_Main-Italic.47373d1e.ttf",revision:"47373d1e"},{url:"/_next/static/media/KaTeX_Main-Italic.8916142b.woff2",revision:"8916142b"},{url:"/_next/static/media/KaTeX_Main-Italic.9024d815.woff",revision:"9024d815"},{url:"/_next/static/media/KaTeX_Main-Regular.0462f03b.woff2",revision:"0462f03b"},{url:"/_next/static/media/KaTeX_Main-Regular.7f51fe03.woff",revision:"7f51fe03"},{url:"/_next/static/media/KaTeX_Main-Regular.b7f8fe9b.ttf",revision:"b7f8fe9b"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.572d331f.woff2",revision:"572d331f"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.a879cf83.ttf",revision:"a879cf83"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.f1035d8d.woff",revision:"f1035d8d"},{url:"/_next/static/media/KaTeX_Math-Italic.5295ba48.woff",revision:"5295ba48"},{url:"/_next/static/media/KaTeX_Math-Italic.939bc644.ttf",revision:"939bc644"},{url:"/_next/static/media/KaTeX_Math-Italic.f28c23ac.woff2",revision:"f28c23ac"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.8c5b5494.woff2",revision:"8c5b5494"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.94e1e8dc.ttf",revision:"94e1e8dc"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.bf59d231.woff",revision:"bf59d231"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.3b1e59b3.woff2",revision:"3b1e59b3"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.7c9bc82b.woff",revision:"7c9bc82b"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.b4c20c84.ttf",revision:"b4c20c84"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.74048478.woff",revision:"74048478"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.ba21ed5f.woff2",revision:"ba21ed5f"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.d4d7ba48.ttf",revision:"d4d7ba48"},{url:"/_next/static/media/KaTeX_Script-Regular.03e9641d.woff2",revision:"03e9641d"},{url:"/_next/static/media/KaTeX_Script-Regular.07505710.woff",revision:"07505710"},{url:"/_next/static/media/KaTeX_Script-Regular.fe9cbbe1.ttf",revision:"fe9cbbe1"},{url:"/_next/static/media/KaTeX_Size1-Regular.e1e279cb.woff",revision:"e1e279cb"},{url:"/_next/static/media/KaTeX_Size1-Regular.eae34984.woff2",revision:"eae34984"},{url:"/_next/static/media/KaTeX_Size1-Regular.fabc004a.ttf",revision:"fabc004a"},{url:"/_next/static/media/KaTeX_Size2-Regular.57727022.woff",revision:"57727022"},{url:"/_next/static/media/KaTeX_Size2-Regular.5916a24f.woff2",revision:"5916a24f"},{url:"/_next/static/media/KaTeX_Size2-Regular.d6b476ec.ttf",revision:"d6b476ec"},{url:"/_next/static/media/KaTeX_Size3-Regular.9acaf01c.woff",revision:"9acaf01c"},{url:"/_next/static/media/KaTeX_Size3-Regular.a144ef58.ttf",revision:"a144ef58"},{url:"/_next/static/media/KaTeX_Size3-Regular.b4230e7e.woff2",revision:"b4230e7e"},{url:"/_next/static/media/KaTeX_Size4-Regular.10d95fd3.woff2",revision:"10d95fd3"},{url:"/_next/static/media/KaTeX_Size4-Regular.7a996c9d.woff",revision:"7a996c9d"},{url:"/_next/static/media/KaTeX_Size4-Regular.fbccdabe.ttf",revision:"fbccdabe"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.6258592b.woff",revision:"6258592b"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.a8709e36.woff2",revision:"a8709e36"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.d97aaf4a.ttf",revision:"d97aaf4a"},{url:"/_next/static/media/e11418ac562b8ac1-s.p.woff2",revision:"0e46e732cced180e3a2c7285100f27d4"},{url:"/favicon.ico",revision:"7122be85f8b752d2957cda2292d8f706"},{url:"/images/audio.png",revision:"d97533563db831c4850bf7d2fad7ad29"},{url:"/images/flash.png",revision:"de1ea736e0c50308077976dcc45283f5"},{url:"/images/library.png",revision:"613f6583c82136f9e48ea23ccc05fe49"},{url:"/images/problems.png",revision:"86c7c68907b5adbd8e33f4ddb8f6e9ed"},{url:"/images/record.png",revision:"54a44e79e325f4a9c78299201c854257"},{url:"/images/sloth-mobile.png",revision:"2370e68c6dc45af120db3a0445647bfb"},{url:"/images/sloth.png",revision:"2c3808b83a830ee853f78c338dd831a2"},{url:"/marban.svg",revision:"fafbc26990869dac9e9c57ae943d37fc"},{url:"/offline",revision:"TNjobgKVpYS6WXK7aYlc1"},{url:"/raw-smile.svg",revision:"7992ed0de998ec99a47fc10a2217ad9a"},{url:"/robots.txt",revision:"00fedfc11a9b2028c277609da390c95b"},{url:"/sitemap-0.xml",revision:"56a08c9ab59737d505a95b79dabdacaf"},{url:"/sitemap.xml",revision:"5f3cffc837b9af24afacbb5fee359760"},{url:"/smiley.svg",revision:"180f6ffd5bcb2948339acbab299962c4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
