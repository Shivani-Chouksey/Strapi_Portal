// 'use strict';

/**
 * home-page controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::home-page.home-page');

// Path: ./src/api/home-page/controllers/home-page.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::home-page.home-page",
  ({ strapi }) => ({
    async find(ctx) {
      // Get the locale from query params or default to 'en'
      const { locale = "en" } = ctx.query;
      console.log("ctx.query", ctx.query);

      // Build the query with dynamic population
      const homePage = await strapi.entityService.findMany(
        "api::home-page.home-page",
        {
          locale,
          populate: {
            product_section: {
              populate: {
                products: {
                  populate: ["product_images"],
                },
              },
            },
            category_section: {
              populate: {
                categories: {
                  populate: ["cover_image"],
                },
              },
            },
            hero_banners: {
              populate: ["cover_images", "button", "available_offer"],
            },
            advertising_banner: {
              populate: ["images", "button", "available_offer"],
            },
            other_sections: {
              on: {
                "testimonial.testimonial-section": {
                  populate: {
                    testimonials: {
                      populate: {
                        profile: {
                          populate: "*",
                        },
                      },
                    },
                  },
                },
              },
            },
            seo: {
              populate: "*",
            },
          },
        }
      );

      return { data: homePage };
    },
  })
);
