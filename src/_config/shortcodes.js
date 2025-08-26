const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    // Shortcodes
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // process specific size imagess
    eleventyConfig.addShortcode("image-profile", async function (src, alt = "") {
		// Check if it's a remote URL
		if (src.startsWith('http')) {
			// Return simple img tag for remote images
			return `<img src="${src}" alt="${alt}" width="300" loading="lazy" decoding="async" />`;
		}
		
		// Use 11ty/eleventy-img for local images
		return Image(src, {
			widths,
			htmlOptions: {         // new in v6.0
				imgAttributes: {
					alt,           // required, though "" works fine
					sizes,         // required with more than one width, optional if single width output
                    width: "300px"
				}
			}
		});
	});
}