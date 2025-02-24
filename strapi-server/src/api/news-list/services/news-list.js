// 'use strict';

// /**
//  * news-list service
//  */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::news-list.news-list');

const axios = require("axios");

module.exports = {
  async fetchAndStoreNews() {
    try {
      const API_URL =
        "https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57";

      const response = await axios.get(API_URL);
      const allNews = response.data.response.results;

      for (const news of allNews) {
        const existingNews = await strapi.db
          .query("api::news-list.news-list")
          .findOne({ where: { news_api_id: news.id } });
        console.log("existingNews", existingNews);

        if (!existingNews) {
          await strapi.entityService.create("api::news-list.news-list", {
            data: {
              title: news.webTitle,
              url: news.webUrl,
              publicationDate: news.webPublicationDate,
              sectionName: news.sectionName,
              news_api_id: news.id,
            },
          });
        }
      }

      return { message: "News fetched and stored successfully" };
    } catch (error) {
      return { error: "Failed to fetch news" };
    }
  },
};
