# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT** Always run npm run build after you add any code to verify your code actually works!

## Development Commands

### Core Development

- `npm run dev` - Start development server with hot reloading (builds widgets, CSS, and serves 11ty)
- `npm run build` - Production build (widgets + CSS + 11ty static generation)
- `npm run preview` - Build and serve production version on port 4000

### Individual Build Steps

- `npm run build:widgets:dev` - Build widgets for development (with sourcemaps)
- `npm run build:widgets:prod` - Build widgets for production (minified with terser)
- `npm run build:css` - Compile SCSS to CSS for development
- `npm run build:css:prod` - Compile SCSS to CSS for production (compressed, no sourcemaps)

### Development Servers

- `npm run dev:widgets` - Watch and rebuild widgets on changes
- `npm run dev:11ty` - Serve 11ty with live reload (watches `_build/js` directory)
- `npm run dev:css` - Watch and compile SCSS on changes

## Architecture Overview

### Build System

- **Eleventy (11ty)** - Static site generator with Nunjucks templating
- **Vite** - JavaScript bundler with separate dev/prod configurations
- **Sass** - CSS preprocessing with Bootstrap integration

### Project Structure

- `src/` - Source files (input directory for 11ty)
  - `_layouts/` - Nunjucks layout templates (base.njk)
  - `_includes/` - Reusable template partials (header.njk, footer.njk, head.njk)
  - `_posts/` - Blog posts in Markdown
  - `_data/` - Global data files (site.js, seo.json)
  - `js/` - JavaScript source files
    - `widgets/` - Lit-based web components
    - `main.js` - Bootstrap component initialization
  - `scss/` - Sass stylesheets with Bootstrap customization
  - `images/` - Static images directory
  - `sitemap.njk` - XML sitemap template
  - `blog.njk` - Blog collection page
  - `robots.txt` - Search engine robots file
- `_build/js/` - Vite output directory (temporary)
- `_site/` - Final 11ty build output
- `vite.dev.config.js` & `vite.prod.config.js` - Separate Vite configurations

### JavaScript Architecture

- **Lit Elements** - Web components for interactive widgets (counter-widget example)
- **Bootstrap JS** - Tree-shakeable imports for Modal, Dropdown, Tooltip, Popover
- **Dual entry points**: `main.js` (Bootstrap) and `widgets/index.js` (Lit components)

### Build Flow

1. Vite builds JS widgets and main.js to `_build/js/`
2. Sass compiles SCSS to `_site/css/`
3. Eleventy copies `_build/js/` to `_site/js/` and processes templates

## Available Tools & Plugins

### Eleventy Plugins (.eleventy.js)

- **eleventy-plugin-seo** - SEO meta tags and optimization
- **@quasibit/eleventy-plugin-sitemap** - XML sitemap generation
- **@quasibit/eleventy-plugin-schema** - Schema.org structured data
- **@11ty/eleventy-plugin-syntaxhighlight** - Code syntax highlighting
- **@11ty/eleventy-plugin-rss** - RSS/Atom feed generation
- **@11ty/eleventy-img** - Image optimization and transformation
- **eleventy-plugin-youtube-embed** - YouTube video embedding
- **@11ty/eleventy-navigation** - Navigation helpers

### Available Shortcodes

- `{% counter startValue, "color" %}` - Lit counter widget (colors: primary, success, danger)
- `{% coffeeMenu %}` - Interactive coffee menu carousel with categories and items
- `{% loyaltyWidget "userName", points %}` - Loyalty rewards card with progress tracking
- `{% storeLocator %}` - Interactive store finder with locations and details
- `{% shoppingCart %}` - Shopping cart component (usually added to base layout)
- `{% year %}` - Current year
- `{% image-profile "url", "alt" %}` - Optimized image with 300px width

### Available Filters

- `dateFilter` - Format dates as "Month Day, Year"
- `excerpt` - Extract first 200 characters before <!--more--> tag

### Bootstrap Components Available

- **CSS Framework**: Bootstrap 5.3.7 with full customization via SCSS
- **Icons**: Bootstrap Icons 1.13.1 (use class="bi bi-icon-name")
- **JS Components**: Modal, Dropdown, Tooltip, Popover (imported in main.js)
- **Responsive Grid**: Full Bootstrap grid system
- **Utilities**: All Bootstrap utility classes

### Lit Web Components

- **counter-widget** - Interactive counter with +/- buttons

  - Properties: `start-value` (number), `color` (string)
  - Supports Bootstrap color variants: primary, success, danger, warning
  - Uses CSS custom properties for Bootstrap integration

- **coffee-menu** - Interactive coffee menu with category filtering

  - Features: Category tabs, item cards with pricing, ratings, and tags
  - Events: Dispatches `add-to-cart` events with item details
  - Responsive grid layout with hover effects and animations

- **loyalty-widget** - Loyalty rewards tracking card

  - Properties: `user-name` (string), `current-points` (number), `target-points` (number)
  - Features: Progress bar, reward tracking, animated UI elements
  - Events: Dispatches `reward-earned` and `view-history` events

- **store-locator** - Interactive store finder and details

  - Features: Store cards, detailed view, hours display, amenities list
  - Events: Dispatches `get-directions` events with store data
  - Responsive design with mobile-friendly layout

- **shopping-cart** - Persistent shopping cart with localStorage
  - Features: Add/remove items, quantity management, cart persistence, checkout simulation
  - Events: Listens for `add-to-cart` and `open-cart` events, dispatches `cart-updated`
  - LocalStorage: Saves cart state under `roastcode_cart` key
  - Integration: Connects with coffee-menu component, updates header badge

### SCSS Structure

- `main.scss` - Main stylesheet entry point
- `_variables.scss` - Bootstrap variable overrides
- `_custom.scss` - Custom styles
- Auto-loads Bootstrap from node_modules
- Supports both dev (with sourcemaps) and prod (compressed) builds

### Collections

- `posts` - All markdown files in `_posts/` directory (reverse chronological)
- `sitemap` - All pages for sitemap generation

### Data Files

- `site.js` - Site-wide configuration and metadata
- `seo.json` - SEO plugin configuration

### LocalStorage Usage

The shopping cart component demonstrates localStorage integration:

- **Key**: `roastcode_cart` - Stores cart data persistently
- **Data Structure**: `{ items: [], total: number, itemCount: number, timestamp: string }`
- **Features**: Automatic save/load, error handling, cross-page persistence
- **Events**: Cart updates trigger `cart-updated` events for UI synchronization

### Development Notes

- Widget changes trigger 11ty rebuild via nodemon watching `_build/js`
- Bootstrap CSS loaded via Sass with custom variables in `_variables.scss`
- Web components automatically registered via `customElements.define()`
- Image optimization supports AVIF, WebP, and JPEG formats
- Shopping cart state persists across page reloads and browser sessions
- All builds output to `_site/` directory
- Always do things the "11ty way", or the "Bootstrap way" when possible. Follow best practices for both.
