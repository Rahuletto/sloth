module.exports = {
    siteUrl: process.env.SITE_URL || 'https://ecne.vercel.app',
    generateRobotsTxt: true,
    priority: 0.8,
    sitemapSize: 7000,
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    },
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: ['/', '/home', '/notes', '/auth'],
        },
      ],
    },
  };