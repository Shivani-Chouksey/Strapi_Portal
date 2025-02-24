// 'use strict';

/**
 * news-list controller
 */

const { factories } = require("@strapi/strapi");

module.exports = factories.createCoreController("api::news-list.news-list");

// module.exports = {
//   async fetchNews(ctx) {
//     console.log("Fetching news...");

//     const result = await strapi
//       .service("api::news-list.news-list")
//       .fetchAndStoreNews();
//     ctx.send(result);
//   },
// };
