# SOFTLAND Land Tax PWA

Mobile-first Bengali land-tax estimate webpage for iPhone Home Screen.

## GitHub Pages
1. Upload all project files to repository root.
2. Open Settings → Pages.
3. Under Build and deployment choose Deploy from a branch.
4. Select main and /(root), then Save.
5. Wait for the Pages URL in Settings → Pages.

## iPhone 12
Open the published URL in Safari → Share → Add to Home Screen → Add.

## Assumptions
Annual base demand = Nal × 2 + Residential × 10 + Commercial/Industrial × 50. Selected year Y means FY Y-(Y+1) was paid; arrears start 1 July Y+1. Current fiscal year is shown separately; completed unpaid years are split into latest three and older years. Penalty is an estimated 6.25% simple annual charge weighted by each unpaid year's age. This is not verified official tax methodology. No user-entered values or calculation results are stored; the service worker caches only static app files.

Rates are user-configured estimates, not verified official government rates.