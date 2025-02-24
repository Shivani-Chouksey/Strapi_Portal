// 'use strict';

const { default: axios } = require("axios");

// /**
//  * news-list controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::news-list.news-list');

module.exports = {
  async fetchNews(ctx) {
    console.log("Fetching news...");

    const result = await strapi
      .service("api::news-list.news-list")
      .fetchAndStoreNews();
    ctx.send(result);
  },
};
