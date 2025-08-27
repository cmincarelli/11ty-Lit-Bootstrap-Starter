# 11ty Lit Bootstrap Starter

A modern, production-ready web starter template built with **Eleventy (11ty)**, **Bootstrap 5**, **Lit web components**, and **Vite**. This template provides a solid foundation for building fast, interactive websites with modern tooling and best practices.

## ✨ Features

### Core Technologies
- **🏗️ Eleventy (11ty)** - Fast static site generator with Nunjucks templating
- **🎨 Bootstrap 5.3.7** - Complete CSS framework with customizable variables
- **⚡ Vite** - Lightning-fast build tool with hot module replacement
- **💎 Lit** - Lightweight web components library
- **🎯 Sass/SCSS** - Advanced CSS preprocessing

### Built-in Components
- **Interactive Counter Widget** - Customizable with Bootstrap color variants
- **Coffee Menu** - Filterable menu with categories and shopping cart integration
- **Loyalty Widget** - User rewards tracking with progress visualization
- **Store Locator** - Interactive store finder with detailed views
- **Shopping Cart** - Persistent cart with localStorage integration

### SEO & Performance
- **SEO Optimized** - Meta tags, structured data, and sitemaps
- **Image Optimization** - AVIF, WebP, and JPEG support with responsive sizing
- **RSS/Atom Feeds** - Automatic feed generation for blog posts
- **Syntax Highlighting** - Code block highlighting for technical content
- **YouTube Embeds** - Easy video integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd 11ty-clone-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080` with hot reloading enabled.

## 📁 Project Structure

```
11ty-clone-starter/
├── src/                    # Source files
│   ├── _data/             # Global data files
│   ├── _includes/         # Reusable templates (header, footer, etc.)
│   ├── _layouts/          # Page layouts
│   ├── _posts/            # Blog posts (Markdown)
│   ├── js/
│   │   ├── widgets/       # Lit web components
│   │   └── main.js        # Bootstrap initialization
│   ├── scss/              # Sass stylesheets
│   └── images/            # Static images
├── _build/js/             # Vite output (temporary)
├── _site/                 # Final build output
├── .eleventy.js           # Eleventy configuration
├── vite.dev.config.js     # Vite development config
└── vite.prod.config.js    # Vite production config
```

## 🛠️ Development

### Available Scripts

#### Core Development
- `npm run dev` - Start development server with hot reloading
- `npm run build` - Production build 
- `npm run preview` - Build and serve production version on port 4000

#### Individual Build Steps
- `npm run build:widgets:dev` - Build widgets with sourcemaps
- `npm run build:widgets:prod` - Build widgets for production (minified)
- `npm run build:css` - Compile SCSS for development
- `npm run build:css:prod` - Compile SCSS for production (compressed)

#### Development Servers
- `npm run dev:widgets` - Watch and rebuild widgets
- `npm run dev:11ty` - Serve 11ty with live reload
- `npm run dev:css` - Watch and compile SCSS

### Build Flow

1. **Vite** builds JavaScript widgets and main.js to `_build/js/`
2. **Sass** compiles SCSS to `_site/css/`
3. **Eleventy** processes templates and copies built assets to `_site/`

## 🧩 Using Web Components

### Counter Widget
```html
{% counter 10, "primary" %}
```

### Coffee Menu
```html
{% coffeeMenu %}
```

### Loyalty Widget  
```html
{% loyaltyWidget "John Doe", 750 %}
```

### Store Locator
```html
{% storeLocator %}
```

### Shopping Cart
```html
{% shoppingCart %}
```

## 🎨 Customization

### Bootstrap Theme
Customize Bootstrap variables in `src/scss/_variables.scss`:

```scss
$primary: #your-brand-color;
$font-family-base: 'Your Font', sans-serif;
```

### Site Configuration
Update site metadata in `src/_data/site.js`:

```javascript
module.exports = {
  title: "Your Site Title",
  description: "Your site description",
  url: "https://your-domain.com",
  // ... more config
};
```

### Adding New Components
1. Create a new Lit component in `src/js/widgets/`
2. Export it from `src/js/widgets/index.js`
3. Add a shortcode in `.eleventy.js`
4. Use it in your templates

## 📝 Content Management

### Blog Posts
Create markdown files in `src/_posts/` with front matter:

```markdown
---
title: "Your Post Title"
date: 2024-01-01
tags: ["tag1", "tag2"]
---

Your content here...
```

### Pages
Create `.njk` files in `src/` directory. They'll automatically use the base layout unless specified otherwise.

## 🔧 Configuration

### Eleventy Plugins
The starter includes these plugins:
- SEO optimization and meta tags
- XML sitemap generation
- Schema.org structured data
- Syntax highlighting
- RSS/Atom feed generation
- Image optimization
- YouTube embed support
- Navigation helpers

### LocalStorage Integration
The shopping cart demonstrates persistent state management:
- Cart data stored under `roastcode_cart` key
- Automatic save/load across page reloads
- Event-driven updates between components

## 📦 Deployment

### Static Hosting (Netlify, Vercel, etc.)
```bash
npm run build
```
Deploy the `_site/` directory.

### GitHub Pages
The build output in `_site/` can be deployed directly to GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details.

## 🎯 What's Next?

- [ ] Add your content and customize the design
- [ ] Configure your domain and deployment
- [ ] Add Google Analytics or other tracking
- [ ] Customize the web components for your needs
- [ ] Add more pages and blog posts

---

Built with ❤️ using Eleventy, Bootstrap, and modern web technologies.