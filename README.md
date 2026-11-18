# ভূমি উন্নয়ন করের (আনুমানিক) হিসাব

Mobile-first Bengali land-tax estimate webpage for iPhone Home Screen. This is a standalone calculator and is not branded as SOFTLAND.

## GitHub Pages
1. Upload all project files to repository root.
2. Open Settings → Pages.
3. Under Build and deployment choose Deploy from a branch.
4. Select main and /(root), then Save.
5. Wait for the Pages URL in Settings → Pages.

## iPhone 12
Open the published URL in Safari → Share → Add to Home Screen → Add.

## Offline use
Open the published app once while online and wait for it to finish loading. The service worker pre-caches the app page, stylesheet, calculator script, and manifest. After that, reopen the Home Screen app while offline. The calculator runs locally and does not need an internet connection for calculations. If the app was already installed/open before an update, open it once online to receive the updated offline cache.

## Privacy and assumptions
No user-entered values or calculation results are stored. The service worker caches only the static app files. Current rates and penalty calculations are estimates and are not verified official government calculations.
