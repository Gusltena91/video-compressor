/*! coi-serviceworker v0.1.7 - Minified inline version for same-origin hosting */
/*  Must be hosted on the SAME origin as your page (not from a CDN) */

if(typeof window==='undefined'){
  self.addEventListener("install",()=>self.skipWaiting());
  self.addEventListener("activate",(e)=>e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch",(e)=>{
    // Only intercept page navigations — add COEP/COOP so SharedArrayBuffer works.
    // All other requests (scripts, wasm, importScripts) pass through untouched.
    if(e.request.mode!=="navigate")return;
    e.respondWith(
      fetch(e.request).then((r)=>{
        if(r.status===0)return r;
        const h=new Headers(r.headers);
        h.set("Cross-Origin-Embedder-Policy","credentialless");
        h.set("Cross-Origin-Opener-Policy","same-origin");
        return new Response(r.body,{status:r.status,statusText:r.statusText,headers:h});
      })
    );
  });
}else{
  (async()=>{
    if(window.crossOriginIsolated!==false)return;
    const r=await navigator.serviceWorker.register(window.document.currentScript.src);
    if(r.active&&!navigator.serviceWorker.controller){
      window.location.reload();
    }else if(!r.active){
      // Wait for the service worker to activate then reload
      const sw=r.installing||r.waiting;
      if(sw){
        sw.addEventListener("statechange",(e)=>{
          if(e.target.state==="activated"){
            window.location.reload();
          }
        });
      }
    }
  })();
}
