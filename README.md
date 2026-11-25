# Nora Home Service Spa

A responsive multi-page marketing and booking-enquiry site built with React, Vite and React Router. Booking enquiries are composed in the visitor’s browser and handed off to WhatsApp; the site does not store submissions.

## Local development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Pages

- `/` — home, services overview, customer feedback, gallery
- `/about` — business introduction and benefits
- `/services` — enquiry-led service information (no unconfirmed treatments or prices)
- `/reviews` — supplied customer feedback
- `/contact` — WhatsApp booking enquiry form and contact information
- `/privacy` — website enquiry privacy information

## Owner review before publishing

- Confirm actual treatments and any public descriptions before changing the service cards in `src/App.jsx` (`serviceCards`). Prices are intentionally omitted.
- Confirm opening hours with the business. The website does not publish unverified hours.
- Add official social accounts only after verifying them.
- Replace illustrative generated spa images in `public/images/` with authentic business photography if available. Current imagery is not represented as Nora staff or premises.
- Review the privacy policy against the business’s actual WhatsApp message handling and retention practices.
- The sitemap and robots endpoints derive the public origin from the request host, so they do not require an invented domain name.
