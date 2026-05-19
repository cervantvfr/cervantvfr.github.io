# cervantvfr.github.io

Personal portfolio site built with Angular 19.

Live site: https://cervantvfr.github.io

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. Production output is in `dist/cervantvfr.github.io/browser/`.

## Deploy to GitHub Pages

Deployment is automated with GitHub Actions (`.github/workflows/deploy.yml`).

### One-time GitHub setup

1. Open the repo on GitHub: **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”)

### Publish
Push to the `master` branch. Each push runs the workflow: install → build → deploy.
You can also run it manually: **Actions → Deploy to GitHub Pages → Run workflow**.
The site will be available at https://cervantvfr.github.io (may take 1–2 minutes after the workflow finishes).

### Local production preview

```bash
npm run build
npx serve dist/cervantvfr.github.io/browser
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
