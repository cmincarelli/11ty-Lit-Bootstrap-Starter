---
layout: base.njk
title: "Customizing Your Eleventy Starter"
author: "Admin"
date: '2024-08-20'
description: "Learn how to customize colors, fonts, and layouts in your new Eleventy site. Make it uniquely yours with these simple steps."
key: customizing-starter
tags: ["tutorial", "customization", "design"]
---

# Customizing Your Eleventy Starter

*Make this starter site uniquely yours*

One of the great things about this Eleventy starter is how easy it is to customize. Let's walk through the key areas you can modify to create your perfect site.

<!--more-->

## Customizing Site Data

### Update Basic Information
Edit `src/_data/site.js` to change:

```javascript
module.exports = {
  title: "Your Amazing Site",
  description: "Your site description here",
  url: "https://yourdomain.com",
  author: {
    name: "Your Name",
    email: "you@yourdomain.com",
  }
};
```

## Styling and Colors

### Bootstrap Variables
Customize the look by editing `src/scss/_variables.scss`:

```scss
// Primary brand colors
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;

// Typography
$font-family-base: "Your Chosen Font", sans-serif;
$font-size-base: 1rem;
```

### Custom Styles
Add your own styles in `src/scss/_custom.scss`:

```scss
.your-custom-class {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  padding: 2rem;
  border-radius: 8px;
}
```

## Content Structure

### Homepage Sections
The homepage (`src/index.njk`) is divided into clear sections:
- Hero section
- Features showcase
- Interactive components demo
- Getting started guide

Simply replace the content within each section with your own.

### Blog Configuration
Blog posts go in `src/_posts/` as Markdown files with frontmatter:

```markdown
---
layout: base.njk
title: "Your Post Title"
author: "Your Name"
date: '2024-08-20'
description: "Brief description"
tags: ["tag1", "tag2"]
---

Your content here...
```

## Navigation and Layout

### Header and Footer
Edit the navigation in `src/_includes/header.njk` and footer content in `src/_includes/footer.njk`.

### Base Layout
The main site structure is in `src/_layouts/base.njk`. This includes:
- HTML head with meta tags
- Site header
- Main content area
- Site footer
- JavaScript imports

## Adding New Pages

Create new pages by adding `.njk` or `.md` files to the `src/` directory:

```markdown
---
layout: base.njk
title: "About"
---

# About Us

Your about page content here...
```

## Web Components

### Using the Counter Widget
The included counter component can be customized:

```html
{% counter 10, "success" %}
{% counter 0, "danger" %}
```

Available colors: `primary`, `secondary`, `success`, `danger`, `warning`, `info`

## Deployment

### Build for Production
```bash
npm run build
```

### Popular Hosting Options
- **Netlify**: Connect your Git repo for automatic deployments
- **Vercel**: Similar Git-based deployment with great performance
- **GitHub Pages**: Free hosting for open source projects
- **Surge.sh**: Simple static site deployment

## Next Steps

1. Update your site metadata and contact information
2. Customize the color scheme to match your brand
3. Replace the sample content with your own
4. Add new pages and blog posts as needed
5. Deploy to your hosting platform of choice

The beauty of this starter is its simplicity and flexibility. Start with these basics and expand as your needs grow!

## Need More Help?

Check out the complete documentation in `CLAUDE.md` for advanced features and configuration options.