---
layout: base.njk
title: "Getting Started with Your New Site"
author: "Admin"
date: '2024-08-25'
description: "Learn how to customize your new Eleventy site with Bootstrap 5 and Lit web components. Complete guide to making it your own."
key: getting-started
tags: ["tutorial", "eleventy", "bootstrap"]
---

# Getting Started with Your New Site

*Welcome to your new Eleventy starter site!*

This site is built with modern web technologies to give you a powerful foundation for any project. Let's explore what's included and how to customize it for your needs.

<!--more-->

## What's Included

### Core Technologies
- **Eleventy (11ty)** - Static site generator with powerful templating
- **Bootstrap 5** - Responsive CSS framework with components
- **Lit Elements** - Lightweight web components for interactivity
- **Sass** - Advanced CSS preprocessing with custom variables
- **Vite** - Fast build tooling with hot module replacement

### Features
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Builds** - Optimized development and production builds  
- 🎨 **Easy Customization** - Update colors, fonts, and layout with variables
- 📝 **Blog Ready** - Complete blog system with pagination
- 🔍 **SEO Optimized** - Meta tags, sitemaps, and structured data

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Start Customizing
Edit these key files to make the site your own:
- `src/_data/site.js` - Site-wide settings and metadata
- `src/scss/_variables.scss` - Colors, fonts, and Bootstrap customization
- `src/index.njk` - Homepage content
- `src/_layouts/base.njk` - Site structure and navigation

## Customization Guide

### Update Site Information
Edit `src/_data/site.js` to update:
- Site title and description
- Contact information and social links
- Author details

### Change Colors and Styling
Modify `src/scss/_variables.scss` to customize:
- Primary and secondary colors
- Font families and sizes
- Bootstrap component styling

### Add Your Content
- Replace the sample blog posts in `src/_posts/`
- Update the homepage sections in `src/index.njk`
- Add new pages by creating `.njk` or `.md` files

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Web Components

This starter includes interactive web components built with Lit:

### Counter Widget
```html
{% counter 0, "primary" %}
```
Interactive counter with customizable colors and starting values.

### Additional Components
The coffee shop example (on the `master` branch) includes more complex components like:
- Coffee menu with filtering
- Loyalty rewards tracking
- Store locator with maps
- Shopping cart with persistence

## Next Steps

1. **Customize the design** - Update colors, fonts, and layout
2. **Add your content** - Replace sample posts with your own
3. **Deploy your site** - Use Netlify, Vercel, or any static hosting
4. **Extend functionality** - Add new web components or integrations

## Need Help?

Check the `CLAUDE.md` file for complete documentation of available features, commands, and architecture details.

Happy building! 🚀