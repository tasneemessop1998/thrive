// Thrive service worker: works offline and loads instantly.
// The page itself is fetched fresh when online (so updates arrive straight away);
// everything else is served from the cache and refreshed in the background.
const VERSION = "thrive-11.0.1";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png",
  "fb/firebase-app-compat.js", "fb/firebase-auth-compat.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;             // Firebase, Groq, food database: always live
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/config.js");
  if (isPage) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then(list => { for (const c of list) { if ("focus" in c) return c.focus(); } return self.clients.openWindow("./"); }));
});
