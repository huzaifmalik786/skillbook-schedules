const fs = require("fs");

const uncrawlableRobotsTxt = `User-agent: *\nDisallow: /`;

function generateRobotsTxt() {
    // Create a non-crawlable robots.txt in non-production environments
    const robotsTxt =
        process.env.ENABLE_SEO === "true"
            ? uncrawlableRobotsTxt
            : uncrawlableRobotsTxt;


    // Create robots.txt file
    try {
        fs.writeFileSync("public/robots.txt", robotsTxt);
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = generateRobotsTxt;