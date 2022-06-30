---
sidebar_position: 2
---

# Add Styles

Then add the styles from Remix-Image into your project.

To do this, add the following code to your `app/root.tsx` file:

```typescript
import remixImageStyles from "remix-image/remix-image.css";

export const links = () => [
  { rel: "stylesheet", href: remixImageStyles },
];
```

When done, your file should look similar this example:

```typescript
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import remixImageStyles from "remix-image/remix-image.css";
import appStyles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix-Image Basic Example",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: remixImageStyles },
  { rel: "stylesheet", href: appStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```