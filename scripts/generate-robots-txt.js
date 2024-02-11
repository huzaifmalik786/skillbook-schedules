const fs = require("fs");

const crawlableRobotsTxt = `User-agent: *\nDisallow: //scrum.\nDisallow: //register.\nDisallow: //certify.\nDisallow: //safe.\nDisallow: //media.\nDisallow: //schedule.\nDisallow: /_next/static/media/\nDisallow: /wp-admin/\nDisallow: /wp-includes/\nDisallow: /wp-content/plugins/\nDisallow: /wp-content/themes/\nDisallow: /wp-login.php\nDisallow: /wp-register.php\nDisallow: /xmlrpc.php\n\nSitemap: https://skillbookacademy.com/sitemap.xml`;

const uncrawlableRobotsTxt = `User-agent: *\nDisallow: /`;

function generateRobotsTxt() {
    // Create a non-crawlable robots.txt in non-production environments
    const robotsTxt =
        process.env.ENABLE_SEO === "true"
            ? crawlableRobotsTxt
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