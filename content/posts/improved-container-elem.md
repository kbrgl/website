---
title: An improved React container component
subtitle: Simplify your layout code with this one weird trick.
date: 2021-01-18
---

In most of my web projects, I use a dead simple container component to constrain the layout:

```css
/* container.module.css */
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 0 20px;
}
```

```jsx
// container.js
import React from "react";
import styles from "./container.module.css";

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

Rather than using complex row and column layouts to create grids, I just use flexbox.

There’s a problem with this approach, though: some parts of a website might require a different `max-width` than others. For instance, this post you’re reading is set at a different width than the [homepage](/). One way to handle this is by accepting a prop:

```jsx
// container.js
import React from "react";
import styles from "./container.module.css";

export default function Container({ children, maxWidth }) {
  return (
    <div className={styles.container} style={{ maxWidth }}>
      {children}
    </div>
  );
}
```

```jsx
// navbar.js
import React from "react";
import Container from "./container";

export default function Navbar() {
  return (
    <nav>
      <Container maxWidth={720}>...</Container>
    </nav>
  );
}
```

But this becomes tedious fast, because there might be several containers on the same page. You’d have to pass a prop to each one.
Instead of all this, you can take advantage of CSS variables:

```css
/* container.module.css */
.container {
  max-width: var(--container-size, 650px);
  margin: 0 auto;
  padding: 0 20px;
}
```

This instructs the browser to either use the `--container-size` CSS variable or fall back to `650px` if it isn’t defined.
Since CSS variables are inherited, you can now do this to set the size of every container on the page:

```css
/* Somewhere in your code, perhaps in a layout component */
:root {
  --container-size: 720px;
}
```

This way, you retain the ability to set the size of an individual container. All you have to do is set the `--container-size` property on one of its parent elements.
