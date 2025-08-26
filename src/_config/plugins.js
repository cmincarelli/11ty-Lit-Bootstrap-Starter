const {
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
  HtmlBasePlugin,
} = require('@11ty/eleventy');

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginSEO = require("eleventy-plugin-seo");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const schema = require("@quasibit/eleventy-plugin-schema");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const youtubeEmbed = require("eleventy-plugin-youtube-embed");

const site = require("../_data/site.js");
const seo = require("../_data/seo.json");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

    eleventyConfig.addPlugin(IdAttributePlugin, {
        // by default we use Eleventy’s built-in `slugify` filter:
        // slugify: eleventyConfig.getFilter("slugify"),
        // selector: "h1,h2,h3,h4,h5,h6", // default
    });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["auto"],

        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
        },
        outputDir: "_site/img/",
        urlPath: "/img/"
    });

    eleventyConfig.addPlugin(schema);

    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addPlugin(HtmlBasePlugin);

    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://theanchorlight.com",
        },
    });

    eleventyConfig.addPlugin(pluginSEO, seo);
    // Add YouTube Embed Plugin

    eleventyConfig.addPlugin(youtubeEmbed, {
        lite: true, // Use lite-youtube-embed for better performance
        size: 'medium', // Default size
        title: true, // Show video title
        noCookie: true, // Use youtube-nocookie.com for privacy
    });

    eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
        stylesheet: 'pretty-atom-feed.xsl',
        templateData: {
            eleventyNavigation: {
                key: 'RSS',
                order: 5,
            },
        },
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: site.title,
			subtitle: site.description,
			base: site.url,
			author: {
				name: site.author.name,
				email: site.author.email, // Optional
			}
		}
	});
}