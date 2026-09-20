PRISM BREAK — iPHONE OFFLINE PWA

This package is the self-contained Prism Break offline build prepared for iPhone installation.

FILES
- index.html: the complete game
- sw.js: caches the app for offline use
- manifest.webmanifest: install metadata
- icon files: Home Screen icons

IMPORTANT
For iPhone Home Screen offline mode, these files must be served over HTTPS at the same site/path.
Opening index.html directly from the Files app can run the HTML, but iOS will not install its service worker from file://.

INSTALL ON iPHONE AFTER HOSTING
1. Open the HTTPS game URL in Safari while online.
2. Play/open it once and wait a few seconds so the cache is populated.
3. Tap Share > Add to Home Screen > Add.
4. Open Prism Break from the Home Screen once while online.
5. Airplane Mode can then be used; the game should continue to launch and play offline.

Offline build behavior: runs, scores, settings and inventory are stored locally on that device/browser profile.
