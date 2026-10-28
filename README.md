# Veridian — Hotel Booking App (React Native freebie)

A pixel-faithful React Native / Expo implementation of the **Veridian** hotel-booking UI kit (dark theme, iPhone 393 × 852 base).

**Stack:** Expo SDK 54 · Expo Router 6 · NativeWind v4 (Tailwind) · shadcn-style components (React Native Reusables registry API) · expo-blur · expo-linear-gradient · expo-image · react-native-svg · DM Sans

## Run it

```bash
cd veridian-mobile
npm install
npx expo install --fix   # aligns every Expo package with your installed SDK
npx expo start           # press i (iOS simulator), a (Android) or scan the QR with Expo Go
```

> If you upgrade to a newer Expo SDK, run `npx expo install expo@latest && npx expo install --fix`.

## Screens & flow

| # | Screen | Route |
|---|--------|-------|
| 01 | Welcome | `app/index.tsx` |
| 02 | Login | `app/login.tsx` |
| 03 | Browse (3D tilt carousel, nearby, top destinations) | `app/(tabs)/index.tsx` |
| 04 | Search landing (suggestion chips + input) | `app/(tabs)/search.tsx` |
| 05–06 | Results — grid / list toggle | `app/search-results.tsx` |
| 07–08 | Filter sheet (date, type, distance & price sliders, amenities, stars) | `components/veridian/filter-panel.tsx` |
| 09 | Applied-filter chips (tap ⊗ to remove) | `app/search-results.tsx` |
| 10–11 | Hotel detail (gallery, blur-on-scroll hero, about, amenities, map, rooms) | `app/hotel/[id].tsx` |
| 12 | Reviews bottom sheet (tap “+1k Reviews”) | `components/veridian/reviews-sheet.tsx` |
| 13 | Booking 1 — Room details | `app/booking/room.tsx` |
| 14 | Booking 2 — Personal details | `app/booking/details.tsx` |
| 15 | Booking 3 — Payment & total | `app/booking/payment.tsx` |
| 16 | Booking confirmed | `app/booking/confirmed.tsx` |
| 17 | My profile | `app/(tabs)/profile.tsx` |
| 18 | Settings (tabs + switches) | `app/settings.tsx` |

Welcome → Login → Browse ⇄ Search ⇄ Profile → Hotel → Room → Details → Payment → Confirmed → Browse.
Gear icon opens Settings, Logout returns to Welcome.

## Project structure

```
app/                     Expo Router screens
components/ui/           shadcn-style primitives (button, input, text, checkbox, switch, badge, progress, avatar, separator, slider)
components/veridian/     product components (cards, carousel, tab bar, filter panel, stepper, map…)
data/hotels.ts           mock content — hotels, reviews, pricing
lib/images.ts            every photo URL in one place (swap for your own)
lib/theme.ts             raw color + gradient tokens
lib/booking-store.tsx    tiny React context for guests / room / filters
global.css               CSS-variable design tokens (shadcn format)
tailwind.config.js       Tailwind theme mapped to the tokens
components.json          registry config — add more components with the React Native Reusables CLI
```

## Design tokens

| Token | Value |
|---|---|
| Background | `#1B1C1E` |
| Card | `#2A2C2F` |
| Primary teal (CTA) | `#12B88E` → `#0FAF87` |
| Rating bar | `#22C9E4` → `#14BFA8` |
| Cyan (active tab / toggles) | `#20C7DB` |
| Discount red | `#E5484D` |
| Hairlines | `rgba(255,255,255,0.12)` |
| Font | DM Sans 400 / 500 / 700 |

## Adding components from the registry

`components.json` follows the shadcn schema with `@/components/ui` aliases, so you can pull more primitives from the React Native Reusables registry, e.g.

```bash
npx @react-native-reusables/cli@latest add dialog
```

## Notes

- Photos are remote Unsplash images (Unsplash License). For offline/production use, download them into `assets/` and replace the URLs in `lib/images.ts`.
- The map is a stylised SVG. Swap `MapPreview` for `react-native-maps` if you need a live map.
- Payment fields are UI only. Wire them to Stripe or another PCI-compliant SDK before handling real cards.
