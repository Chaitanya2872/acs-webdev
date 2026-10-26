# ACS Technologies — Website

React single-page app for [acstechnologies.co.in](https://www.acstechnologies.co.in), built with Vite, React Router, Bootstrap 5, AOS and Swiper.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
npm run lint
```

## Project structure

```
public/                    Copied as-is into dist/
  .htaccess                Apache SPA fallback (deep links + old *.html URLs -> index.html)
  contact_form.php         Mail endpoint for the Contact page forms
  forms/newsletter.php     Mail endpoint for the footer newsletter form
  assets/docs/             Investor filings (PDF/HTML) — URLs unchanged from the old site
  assets/img/              Images referenced by the site
src/
  main.jsx, App.jsx        Entry point and route table
  routes/                  paths.js (URL helpers), legacyRedirects.js (old .html -> new routes)
  data/                    All page content — edit these to update the site
  components/layout/       Header, NavMenu, Footer, NewsletterForm, Layout
  components/common/       Logo, SectionTitle, DataTable, DocumentTable, Tabs, ScrollHint
  components/home/         Home page sections (hero + animated globe, certifications, services, clients)
  components/contact/      EnquiryForm
  pages/                   One component per page type
  hooks/, lib/             Shared hooks and helpers
  styles/                  main.css (BizLand template theme), components.css (React-era additions)
```

## Updating content

| To change…                         | Edit                                                     |
| ---------------------------------- | -------------------------------------------------------- |
| Add, replace or remove an investor filing | Use the document portal (Website Documents). No code change or deploy needed — see *Investor documents* below |
| Board, committees, directorships   | `src/data/board.js`                                      |
| Auditors / RTA / grievance contact | `src/data/investorInformation.js`                        |
| Team members                       | `src/data/team.js` (photos in `public/assets/img/team/`) |
| Portfolio / product pages          | `src/data/portfolios.js`, `src/data/products.js`         |
| Home page text, news ticker, certs | `src/data/home.js`                                       |
| Menu, footer links, filing groups  | `src/data/navigation.js`                                 |
| Phone, email, offices, socials     | `src/data/site.js`                                       |

A new investor document page needs a portal category with the same slug and, for the menu, a link in `src/data/navigation.js`; it is served at `/investors/<slug>` automatically. Adding an entry to `documentPages` gives it a title and an offline fallback.

## Investor documents

Filings are managed in the document portal (`acs_webdev_portal`): administrators upload a PDF, choose the
category (= website page), and publish. The file is stored in S3, its metadata in the portal database, and
`DocumentListPage` loads the published list from the portal's public API at runtime:

```
GET {VITE_DOCUMENTS_API_URL}/public/sections/<slug>/documents
```

Set the API root at build time (see `.env.example`):

```bash
VITE_DOCUMENTS_API_URL=https://portal-api.acstechnologies.co.in/api/v1
```

- Publishing, unpublishing and replacing a file take effect without rebuilding the site (listings are cached for
  up to `PUBLIC_LIST_CACHE_SECONDS`, 60 s by default).
- If the variable is unset or the API is unreachable, pages show the bundled lists in
  `src/data/investorDocuments.js`, which link to the original files in `public/assets/docs/`.
- Old links to `/assets/docs/...` keep working: while the file exists Apache serves it; if it is ever removed,
  `.htaccess` hands the request to the app and `LegacyDocumentPage` forwards it to the migrated document.

## Deployment (cPanel / Apache)

1. `npm run build`
2. Upload the contents of `dist/` to `public_html/`. The `.htaccess` it includes routes every non-file URL to `index.html`, so deep links and old URLs such as `/annual_reports.html` keep working (they redirect in the browser).

`dist/` includes the ~590 MB of filings in `assets/docs`. For routine deploys you only need to re-upload `index.html` and `static/`; new filings are published from the portal, not deployed. Keep the existing `assets/docs` files on the server until the portal migration has been verified.
