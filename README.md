# @biskin-style/calendar

Small, feature-rich of calendar components

- **Small bundle size** - less than 9kb min/gzip
- **Full feature set** - single dates, ranges, display multiple months
- **HTML-friendly** - easy to author, framework-independent
- **Minimal dependencies** - just one
- **Accessible** - keyboard and screen reader
- **Localizable** - `Intl.DateTimeFormat`, CSS logical properties, RTL support
- **Themeable** - CSS parts and custom properties to offer flexibility and power
- **Composable** - impose no DOM specific structure, play well with others

## Installation

```bash
npm install @biskin-style/calendar
```

## Usage

### Via module

```js
import "@biskin-style/calendar";
```

### Via CDN

```html
<script type="module" src="https://unpkg.com/cally"></script>
```

### Using the components

```html
<calendar-range months="2">
  <calendar-month></calendar-month>
  <calendar-month offset="1"></calendar-month>
</calendar-range>
```

## Docs

For full documentation, visit: https://wicky.nillia.ms/cally/

## License

MIT
