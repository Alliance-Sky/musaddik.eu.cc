# musaddik.eu.cc

A personal portfolio built with React and Vite.

## Development

To start the development server:
```bash
npm install
npm run dev
```

## Build

To build the project for production:
```bash
npm run build
```

## Deployment

This project is configured to deploy directly to Cloudflare using the modern **Workers with Static Assets** approach. The configuration and custom domain (`musaddik.eu.cc`) are managed automatically via the `wrangler.jsonc` file.

To deploy your changes to Cloudflare:
```bash
npm run build
npx wrangler deploy
```

## License
MIT
