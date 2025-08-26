const markdownIt = require("markdown-it");

const pluginFilters = require("./src/_config/filters.js");
const pluginPlugins = require("./src/_config/plugins.js");
const pluginShortcodes = require("./src/_config/shortcodes.js");

const site = require("./src/_data/site.js");

module.exports = function (eleventyConfig) {

    function excerpt(content) {
        const excerpt = content.split('<!--more-->')[0];
        return excerpt.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    }

    eleventyConfig.addGlobalData("eleventyComputed", {
        excerpt: (data) => excerpt(data.description || data.excerpt),
        meta: (data) => {
            let meta = {
                site: {
                    name: site.title,
                    description: data.description || site.description,
                    url: site.url,
                },
                language: 'en-US',
                url: site.url + (data.permalink || '/'),
                title: data.title || site.title,
                description: data.description || site.description,
                image: {
                    src: data.image || site.url + '/images/default.jpg',
                },
            };
            if (data.type === 'post') {
                meta.author = {
                    name: site.author.name,
                    email: site.author.email,
                };
                meta.published = new Date(data.date).toISOString();
                meta.section = data.categories[0] || 'Blog';
            };
            return meta;
        },
        type: (data) => data.type || 'page',
    });

    // Plugins
    eleventyConfig.addPlugin(pluginPlugins);

    // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
    // Bundle <style> content and adds a {% css %} paired shortcode
    eleventyConfig.addBundle('css');
    // Bundle <script> content and adds a {% js %} paired shortcode
    eleventyConfig.addBundle('js');
    // React Helmet-style <head> additions
    eleventyConfig.addBundle('html');

    eleventyConfig.addWatchTarget('css/**/*.css');
    eleventyConfig.addWatchTarget('scss/**/*.scss');
    eleventyConfig.addWatchTarget('src/**/*.{svg,webp,png,jpg,jpeg,gif}');

    // Copy from temp location to final location
    eleventyConfig
        .addPassthroughCopy({
            './public/': '/',
            "_build/js": "js",
            "node_modules/bootstrap-icons/font/fonts": "css/fonts",
        })
        .addPassthroughCopy('android-chrome-*.png')
        .addPassthroughCopy('apple-touch-icon.png')
        .addPassthroughCopy('favicon-*.png')
        .addPassthroughCopy('favicon.ico')
        .addPassthroughCopy('src/feed/pretty-atom-feed.xsl');

    // Collections
    eleventyConfig.addCollection("sitemap", function (collectionApi) {
        // remove these items from the sitemap
        const items = collectionApi.getAll().filter((item) => {
            //if (item.template.inputPath.toLowerCase().includes('readme')) return false;
            return true;
        });
        return items.map((item, index, all) => {
            return {
                url: item.url,
                date: item.date,
                excerpt: item.data.description,
                data: {
                    ...item.data,
                },
            };
        });
    });
    // Blog collections
    eleventyConfig.addCollection('posts', function (collectionApi) {
        return collectionApi.getFilteredByGlob('./src/_posts/**/*.md').reverse();
    });

	eleventyConfig.addCollection( "tutorialPosts", function (collectionsApi) { 
        return collectionsApi.getFilteredByTag("tutorial");
    });

	eleventyConfig.addCollection( "newsPosts", function (collectionsApi) { 
        return collectionsApi.getFilteredByTag("news");
    });

    //Widgets
    eleventyConfig.addShortcode("counter", (startValue = 0, color = "primary") => {
        return `<counter-widget start-value="${startValue}" color="${color}"></counter-widget>`;
    });
    eleventyConfig.addShortcode("coffeeMenu", () => {
        return `<coffee-menu></coffee-menu>`;
    });
    eleventyConfig.addShortcode("loyaltyWidget", (userName = "Developer", currentPoints = 750) => {
        return `<loyalty-widget user-name="${userName}" current-points="${currentPoints}"></loyalty-widget>`;
    });
    eleventyConfig.addShortcode("storeLocator", () => {
        return `<store-locator></store-locator>`;
    });
    eleventyConfig.addShortcode("shoppingCart", () => {
        return `<shopping-cart></shopping-cart>`;
    });

    // Shortcodes
    eleventyConfig.addPlugin(pluginShortcodes);

    // Filters
    eleventyConfig.addPlugin(pluginFilters);

    const md = markdownIt({
        html: true,
        linkify: true, // this auto-links plain URLs
    });

    eleventyConfig.setLibrary("md", md);

    // Transform to add lead class to first paragraph in posts
    eleventyConfig.addTransform(
        'firstParagraphLead',
        function (content, outputPath) {
            // Only apply to post pages
            if (
                outputPath &&
                outputPath.includes('/blog/') &&
                outputPath.endsWith('.html')
            ) {
                // Find the first paragraph in the post content and add lead class
                return content.replace(/(<p>)/, '<p class="lead">');
            }
            return content;
        }
    );

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: 'njk',

        dir: {
            input: "src",
            output: "_site",
            data: "_data",
            includes: "_includes",
            layouts: "_layouts",
            posts: "_posts",
        },
    };
};