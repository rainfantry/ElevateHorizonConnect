# Elevate Horizon Connect — Journal

React Native mobile app for community event management. Cert IV IT Programming —
Intermediate Mobile App Development. Built with Expo SDK 54, React Navigation, and
React Native Paper.

![Bookings Screen](Screenshot%202026-06-13%20133328.png)

---

## What This Is

A mobile app for a fictional local council ("Elevate Horizon Connect") that runs
community events — yoga, walking clubs, trivia nights, movie screenings, live music.
The idea is residents can browse events, view details, register with validation,
and manage their bookings from their phone. Replaces the spreadsheet-and-email
chaos the council was supposedly drowning in.

Five screens. Two custom contexts for shared state. Persistent dark mode and
persistent bookings. Fetches live event data from a remote JSON endpoint.

## What I Built

### HomeScreen
The landing page. Fetches events from `https://tafeshaun.github.io/elevate-data/events.json`
using async/await. Shows each event in a Material Design Card (title, date,
description). Pull-to-refresh. Loading spinner while fetching. Error handling with
retry button if the network fails. Tap any card → navigates to DetailsScreen with
the event object passed as a navigation param.

### DetailsScreen
Full event details in a Card. Shows title, description, ID. Two buttons — "Register
for this event" (pushes RegisterScreen with the event forwarded) and "Go Back."
Theme-aware backgrounds.

### RegisterScreen
The registration form. Three controlled inputs — name, email, ticket count. Validation
runs on every render (derived, not stored state): name ≥2 chars, email regex, tickets
1–10 as integer. Errors only show after the user taps "Confirm registration" — no spam
on an empty form. On valid submit: calls `addBooking()` from shared BookingsContext,
shows a Snackbar toast, auto-navigates back after 2 seconds. No backend — bookings
persist locally via AsyncStorage.

### BookingsScreen
"My Bookings" tab. Reads from the shared BookingsContext. Lists each booking as a Card
with event title, ticket count, name, email. Delete button on each card (red, styled as
a clear destructive action). Empty state message when no bookings exist. Dynamic count
label ("1 booking" vs "3 bookings").

### SettingsScreen
Notifications toggle (local demo). Dark mode toggle — fully persistent via ThemeContext
+ AsyncStorage. Flips the entire app instantly. Remembered on app restart. Drives both
React Native Paper themes AND React Navigation themes simultaneously.

## How It's Wired

### Navigation
```
Tab Navigator (bottom bar, pink active icon #ed019a)
├── Home (Stack Navigator)
│   ├── HomeScreen
│   ├── DetailsScreen
│   └── RegisterScreen
├── Bookings (single screen)
└── Settings (single screen)
```

Stack inside the Home tab means you can navigate forward through the event detail/register
flow and back-button your way out. Bookings and Settings are standalone tabs.

### Shared State (Context)

**BookingsContext** — holds the bookings array + `addBooking()` / `removeBooking()` functions.
Persisted to AsyncStorage key `@ehc_bookings`. RegisterScreen writes to it. BookingsScreen
reads from it. No prop drilling — Context bridges two unrelated screens.

**ThemeContext** — holds `isDark` boolean + `toggleTheme()` + both Paper and Navigation theme
objects. Persisted to AsyncStorage key `@ehc_dark_mode`. SettingsScreen toggles it.
Every screen uses `useTheme()` from Paper for live colours instead of hardcoded hex.

Two-library coordination: one toggle flips both `paperTheme` and `navTheme` at the same
time, so the entire app — headers, tab bar, screen backgrounds, card surfaces, text
colours — all switch together.

## Key Concepts Demonstrated

| Concept | Where |
|---------|-------|
| Remote data fetching (async/await) | HomeScreen — fetch + error handling + refresh |
| Navigation params | HomeScreen → DetailsScreen → RegisterScreen (event object rides along) |
| Controlled form inputs | RegisterScreen — `value={state} onChangeText={setState}` |
| Per-field validation | RegisterScreen — derived errors, gated display |
| React Context (shared state) | BookingsContext + ThemeContext (two separate providers) |
| Immutable state updates | `[...prev, new]` for add, `.filter()` for delete |
| AsyncStorage persistence | Bookings + dark mode survive app restart |
| Theme coordination | Paper + React Navigation themes from one toggle |
| Empty states | BookingsScreen — "No bookings yet" when list is empty |
| Pull-to-refresh | HomeScreen — RefreshControl |
| Accessibility | Labels on buttons, semantic Paper components |

## What Changed from the Teacher's Scaffold

Started from `TAFESHAUN/MobileDev/ShaunPro` baseline. What I added:

- **RegisterScreen.js** — built from scratch (new screen, full form + validation)
- **BookingsScreen.js** — built from scratch (new screen, CRUD on bookings)
- **context/BookingsContext.js** — custom context + AsyncStorage persistence
- **context/ThemeContext.js** — custom context, dual-library theme coordination
- **App.js** — rewired with context providers, tab bar styling, new screen registration
- **HomeScreen.js** — switched to live remote data (fetch), added dark theme support
- **DetailsScreen.js** — added Register button + navigation to RegisterScreen
- **SettingsScreen.js** — refactored to use ThemeContext for persistent dark mode
- **app.json** — app name, slug, Android package (`com.gwu0738.elevatehorizonconnect`)

## How to Run

```bash
cd EHC-MobileApp
npm install
npx expo start
# Press 'w' for web, or scan QR with Expo Go
```

Needs Node 18+, npm 9+. Web preview works in any browser. Mobile preview needs
Expo Go installed on the phone.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo SDK 54 |
| Navigation | React Navigation v7 (bottom tabs + native stack) |
| UI | React Native Paper (Material Design) |
| State | React Context + AsyncStorage |
| Language | JavaScript (ES2022+) |
| Data | Remote JSON endpoint |

---

*Cert IV IT Programming — TAFE NSW, 2026. George Wu.*
