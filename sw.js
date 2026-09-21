const CACHE='prism-offline-development-c4de31d516e4';
const ROOT=new URL('./',self.registration.scope).href;
const SHELL=new URL('index.html',ROOT).href;
async function saveShell(){
 const response=await fetch(ROOT,{cache:'reload',credentials:'same-origin'});
 if(!response.ok)throw Error('Offline download failed');
 const html=await response.text();
 if(!html.includes('PRISM_OFFLINE_SHELL'))throw Error('The game page was not returned');
 const cache=await caches.open(CACHE);
 // Reconstruct the response so a hosting redirect cannot poison offline navigation.
 const clean=new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}});
 await cache.put(SHELL,clean.clone());await cache.put(ROOT,clean);
 await Promise.all(['icon-192.png','icon-512.png','apple-touch-icon.png','manifest.webmanifest'].map(async p=>{try{const r=await fetch(new URL(p,ROOT));if(r.ok)await cache.put(new URL(p,ROOT),r);}catch{}}));
}
self.addEventListener('install',e=>e.waitUntil(saveShell().then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const cache=await caches.open(CACHE);if(!await cache.match(SHELL))throw Error('No offline game');await self.clients.claim();for(const key of await caches.keys())if(key.startsWith('prism-offline-development-')&&key!==CACHE)await caches.delete(key);})()));
self.addEventListener('message',e=>{if(e.data?.type==='PRISM_OFFLINE_CHECK')e.waitUntil((async()=>{const cache=await caches.open(CACHE);e.ports[0]?.postMessage({ready:!!await cache.match(SHELL),version:CACHE});})());});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url),root=new URL(ROOT);
 if(e.request.method!=='GET'||u.origin!==root.origin||!u.pathname.startsWith(root.pathname))return;
 e.respondWith((async()=>{const cache=await caches.open(CACHE);
 // Home-screen launches, query strings and index aliases all use the saved shell.
 if(e.request.mode==='navigate'||u.pathname===root.pathname||u.pathname===new URL(SHELL).pathname){const shell=await cache.match(SHELL);if(shell)return shell;}
 return await cache.match(e.request,{ignoreSearch:true})||fetch(e.request);
 })());
});
