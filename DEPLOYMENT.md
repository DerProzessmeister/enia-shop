# Deployment-Anleitung — Enia Bodenfachhandel Shop

## 1. Vercel Deployment (empfohlen — kostenlos)

### Schritt 1: GitHub Repo erstellen
```bash
cd /data/.openclaw/workspace/projekte/enia-shop-nextjs
git init
git add .
git commit -m "Initial shop setup"
git remote add origin https://github.com/DEIN-USERNAME/enia-boden-shop.git
git push -u origin main
```

### Schritt 2: Vercel verbinden
1. Gehe zu https://vercel.com/new
2. "Import Git Repository" → dein GitHub-Repo wählen
3. Framework: Next.js (automatisch erkannt)
4. Environment Variables eintragen (siehe unten)
5. Deploy klicken → Shop ist in 2 Minuten live!

### Schritt 3: Environment Variables in Vercel
```
NEXT_PUBLIC_SITE_URL=https://deine-domain.de
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxx
```

## 2. Kinsta Deployment (bereits vorhanden)

Da du Kinsta-Hosting hast, kann der Shop dort gehostet werden:

```bash
# SSH in Kinsta einloggen
ssh promafarbenundlacke@35.198.155.162 -p 57169

# Next.js auf Kinsta (Application Hosting)
# 1. In Kinsta Dashboard → "Add Application"
# 2. GitHub Repo verbinden
# 3. Build Command: npm run build
# 4. Start Command: npm start
```

## 3. Domain einrichten

Empfohlene Domain für den neuen Shop:
- enia-boden.de (neu kaufen, ~15€/Jahr)
- bodenfachhandel-hamburg.de/shop (Unterordner)

## 4. WooCommerce API aktivieren

In WordPress (bodenfachhandel-hamburg.de):
1. WooCommerce → Einstellungen → Erweitert → REST API
2. Neuen API-Schlüssel erstellen
3. Keys in .env.local eintragen:
```
WC_CONSUMER_KEY=ck_xxxxx
WC_CONSUMER_SECRET=cs_xxxxx
```

## 5. Zahlungen einrichten

### Stripe
1. https://dashboard.stripe.com → API Keys
2. Publishable Key + Secret Key in Vercel ENV eintragen

### Klarna
1. https://portal.klarna.com → Händler-Account erstellen
2. Klarna Payments API Credentials eintragen

### PayPal
1. https://developer.paypal.com → App erstellen
2. Client ID in NEXT_PUBLIC_PAYPAL_CLIENT_ID eintragen

## 6. Lokale Entwicklung

```bash
cd /data/.openclaw/workspace/projekte/enia-shop-nextjs
npm run dev     # Entwicklungsserver auf :4200
npm run build   # Production Build testen
npm start       # Production Server
```

## Status
- Build: ✅ Erfolgreich
- Seiten: 6 (/, /produkte, /produkte/[slug], /checkout, /konto)
- Produkte: 277 Enia-Produkte
- Stand: 02.04.2026
