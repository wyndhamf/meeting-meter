# Meeting Meter (meetingmeter.ai)

A minimal MVP web app: landing page, pricing, waitlist API, and a demo dashboard for CSV-based salary import and meeting cost analytics. Built on Next.js (Pages Router) with Tailwind via CDN for speed.

## Quickstart

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Features
- Landing page with product overview and CTAs
- Pricing page
- Waitlist API: stores emails to `data/waitlist.json`
- Dashboard demo: upload CSV of team salaries and view simple meeting cost analytics
- Privacy and Terms pages

## CSV Format
Headers: `name,email,annualSalary`

Example:
```
name,email,annualSalary
Alice,a@company.com,165000
Bob,b@company.com,120000
```

Hourly = annualSalary / 2080.

## Notes
- File-based storage is for local/demo. Use a database for production.
- For Google auth and Calendar, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` env vars.