# Invoice Generator (front end)

A React/Redux app that lets freelance software developers put together a customized, branded invoice for a client in a few minutes and download it as a PDF. It is the front end of Invoice Generator. The PDF itself is built by the companion API.

**Back end:** [shanehobson/invoice-generator](https://github.com/shanehobson/invoice-generator)

## Features

- **Guided setup.** A step-by-step flow with a progress bar collects whether you and your client are individuals or businesses, both parties' names and addresses, and the initial line items.
- **Line items.** Each item has a description, a unit count, a rate, and a fee type: a flat fee, or per hour, day, week, month, year, word, item, or unit. Line totals and the subtotal are calculated automatically.
- **Editable invoice preview.** On the final step, you edit the invoice in place. Hovering over a section reveals controls to:
  - add, edit, or delete line items
  - apply a discount as a percentage or a fixed amount
  - add taxes as a percentage or a fixed amount, with a custom label
  - pick a due date
  - change the brand color with a color picker
  - add a note
- **PDF generation.** "Generate PDF" posts the invoice to the back-end API, which renders the PDF, stores it in S3, and returns a link that opens in a new tab.
- **Saved progress.** Party details and your place in the flow are kept in `localStorage`.

## Tech stack

- React 16 and Redux (with redux-thunk)
- Material-UI v1 and Material-UI pickers, `react-color`, `date-fns`
- axios, for calls to the PDF API
- Webpack 4 and Babel 6, with ESLint
- Express, which serves the built app

## How it works

```
React/Redux UI  --POST /build (invoice JSON)-->  Express API  --PDFKit-->  PDF  --upload-->  S3
       ^                                                                                     |
       +------------------------------------ { url } <---------------------------------------+
```

The API endpoint is set by `buildUrl` at the top of `src/components/Contract.js`. When you run the back end locally, change it to your local address (the API listens on port 3002 by default).

## Getting started

The build depends on `node-sass` 4.x, which needs an older Node.js release (Node 12 or 14).

```bash
npm install

# Development server with live reload
npm run dev-server

# Production build to public/dist
npm run build

# Serve public/ with Express (defaults to port 3001)
npm start
```

`server.js` reads one environment variable, `PORT`, which is optional.

## Project structure

```
src/
  components/
    formPages/          # Setup steps (Page1 ... Page5, Page9)
    Contract.js         # Invoice preview, totals, and the PDF request
    *Sidebar.js         # Controls for branding, dates, discounts, taxes, notes, and line items
    WorkingDocument.js
  actions/, reducers/, store/   # Redux state
  JSONdata/             # US states and fee types
server.js               # Static Express server
```

## Credits

Built with [Michael Rooze](https://github.com/miwaro).

## Related

- [invoice-generator](https://github.com/shanehobson/invoice-generator): the Node.js/Express API that builds the PDF
- [contract-generator](https://github.com/shanehobson/contract-generator): a companion tool that generates web development services contracts
