// 'use strict';

// /**
//  * news-list router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::news-list.news-list');
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/news-list",
      handler: "news-list.fetchNews",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
