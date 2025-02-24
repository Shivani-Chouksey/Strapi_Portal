// const axios = require("axios");

// module.exports = {
//   fetchNewsEvery10Sec: {
//     task: async ({ strapi }) => {
//       console.log("✅ Running Cron Job: Fetching News Every 10 Seconds...");
//       fetchAndStoreNews
//     },
//     options: {
//         rule: "*/10 * * * * *", // Runs every 10 seconds
//     //   rule: "0 0 * * *", // Runs every 24 hours at midnight UTC
//       tz: "Asia/Kolkata", // Adjust timezone if needed
//     },
//   },
// };

// async function  fetchAndStoreNews() {
//     try {
//       const API_URL =
//         "https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57";

//       const response = await axios.get(API_URL);
//       const allNews = response.data.response.results;

//       for (const news of allNews) {
//         const existingNews = await strapi.db
//           .query("api::news-list.news-list")
//           .findOne({ where: { news_api_id: news.id } });
//         console.log("existingNews", existingNews);

//         if (!existingNews) {
//           await strapi.entityService.create("api::news-list.news-list", {
//             data: {
//               title: news.webTitle,
//               url: news.webUrl,
//               publicationDate: news.webPublicationDate,
//               sectionName: news.sectionName,
//               news_api_id: news.id,
//             },
//           });
//         }
//       }

//       return { message: "News fetched and stored successfully" };
//     } catch (error) {
//       return { error: "Failed to fetch news" };
//     }
//   },

const axios = require("axios");

module.exports = {
  fetchNewsEvery10Sec: {
    task: async ({ strapi }) => {
      console.log("✅ Running Cron Job: Fetching News Every 10 Seconds...");
      await fetchAndStoreNews(strapi); // ✅ Now actually calling the function
    },
    options: {
      //   rule: "*/10 * * * * *", // Runs every 10 seconds
      rule: "0 0 * * *", // Runs every 24 hours at midnight UTC
      tz: "Asia/Kolkata", // Adjust timezone if needed
    },
  },
};

// ✅ Pass `strapi` to the function
async function fetchAndStoreNews(strapi) {
  try {
    const API_URL =
      "https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57";

    const response = await axios.get(API_URL);
    const allNews = response.data.response.results;

    for (const news of allNews) {
      const existingNews = await strapi.db
        .query("api::news-list.news-list")
        .findOne({ where: { news_api_id: news.id } });

      console.log("🔍 Checking if news already exists:", existingNews);

      if (!existingNews) {
        console.log("🆕 Adding new news:", news.webTitle);
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

    console.log("✅ News fetched and stored successfully");
  } catch (error) {
    console.error("❌ Error fetching news:", error);
  }
}
