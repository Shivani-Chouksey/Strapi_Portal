"use strict";

/**
 * news-list router
 */

const { factories } = require("@strapi/strapi");

module.exports = factories.createCoreRouter("api::news-list.news-list");
// module.exports = {
//   routes: [
//     {
//       method: "GET",
//       path: "/news-list",
//       handler: "news-list.fetchNews",
//       config: {
//         policies: [],
//         middlewares: [],
//       },
//     },
//   ],
// };
