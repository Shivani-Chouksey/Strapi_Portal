module.exports = {
  fetchNewsEvery10Sec: {
    task: async ({ strapi }) => {
      console.log("✅ Running Cron Job: Fetching News Every 10 Seconds...");
      await strapi.service("api::news-list.news-list").fetchAndStoreNews();
    },
    options: {
      //   rule: "*/10 * * * * *", // Runs every 10 seconds
      rule: "0 0 * * *", // Runs every 24 hours at midnight UTC
      tz: "Asia/Kolkata", // Adjust timezone if needed
    },
  },
};
