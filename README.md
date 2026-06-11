# 🌸 Bloom Beauty — Fullstack Starter

React + TypeScript + Tailwind CSS (Frontend) | Express + Node.js (Backend)

## Voraussetzungen

- **Node.js** v18 oder höher → https://nodejs.org/

## Setup (einmalig)

```bash
# 1. In den Projektordner wechseln
cd bloom

# 2. Alle Abhängigkeiten installieren
npm run install:all
```

## Starten

```bash
# Frontend + Backend gleichzeitig starten
npm run dev
```

- **Frontend** läuft auf → http://localhost:5173
- **Backend** läuft auf → http://localhost:3001

## Projektstruktur

```
bloom/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, CartDrawer, ProductCard, Footer
│   │   ├── context/        # Cart State (React Context)
│   │   ├── hooks/          # useProducts, useBestsellers
│   │   ├── lib/            # Types, Utilities
│   │   └── pages/          # HomePage, ShopPage, AboutPage
│   └── ...
├── server/
│   └── src/
│       └── index.js        # Express API (products, contact, subscribe)
└── package.json            # Root-Scripts
```

## API Endpoints

| Method | URL | Beschreibung |
|--------|-----|--------------|
| GET | /api/products | Alle Produkte (optional: ?category=Skincare) |
| GET | /api/products/bestsellers | Bestseller-Produkte |
| POST | /api/contact | Kontaktformular |
| POST | /api/subscribe | Newsletter Anmeldung |

## Nächste Schritte

- Produktbilder in `client/public/images/` ablegen
- Echte Datenbank (z.B. SQLite mit better-sqlite3) einbinden
- Stripe für Checkout integrieren
