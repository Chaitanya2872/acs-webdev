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
| Add an investor filing             | Put the file in `public/assets/docs/<folder>/`, then add `{ title, href, type }` to the top of its list in `src/data/investorDocuments.js` |
| Board, committees, directorships   | `src/data/board.js`                                      |
| Auditors / RTA / grievance contact | `src/data/investorInformation.js`                        |
| Team members                       | `src/data/team.js` (photos in `public/assets/img/team/`) |
| Portfolio / product pages          | `src/data/portfolios.js`, `src/data/products.js`         |
| Home page text, news ticker, certs | `src/data/home.js`                                       |
| Menu, footer links, filing groups  | `src/data/navigation.js`                                 |
| Phone, email, offices, socials     | `src/data/site.js`                                       |

A new investor document page only needs a new entry in `documentPages`; it is served at `/investors/<slug>` automatically. Link to it from `src/data/navigation.js`.

## Deployment (cPanel / Apache)

1. `npm run build`
2. Upload the contents of `dist/` to `public_html/`. The `.htaccess` it includes routes every non-file URL to `index.html`, so deep links and old URLs such as `/annual_reports.html` keep working (they redirect in the browser).

`dist/` includes the ~590 MB of filings in `assets/docs`. For routine deploys you only need to re-upload `index.html`, `static/` and any new documents.
