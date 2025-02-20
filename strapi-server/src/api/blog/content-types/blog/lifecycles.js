module.exports = {
  // async beforeCreate(data) {
  //   console.log("data before blog create", data.params.data.tags);
  //   // Check if tags are provided
  //   if (data.params.data.tags && Array.isArray(data.params.data.tags)) {
  //     const tagIds = data.params.data.tags.map((tag) => tag.id);
  //     console.log("tagIds", tagIds);
  //     // Fetch existing tags from the database using their IDs
  //     const existingTags = await strapi.entityService.findMany("api::tag.tag", {
  //       filters: { id: { $in: tagIds } },
  //       fields: ["id", "name"], // Adjust this field based on your tag model
  //     });
  //     const existingTagNames = existingTags.map((tag) => tag.name);
  //     console.log("existingTagNames", existingTagNames);
  //     // Filter out existing tags
  //     const newTags = data.params.data.tags
  //       .filter((tag) => !existingTagNames.includes(tag.name))
  //       .map((tag) => tag.name); // Get names of new tags
  //     console.log("newTags", newTags);
  //     // Create new tags if they don't exist
  //     const createdTags = [];
  //     for (const tagName of newTags) {
  //       const createdTag = await strapi.entityService.create("api::tag.tag", {
  //         data: { name: tagName }, // Adjust this field based on your tag model
  //       });
  //       createdTags.push(createdTag);
  //     }
  //     // Update data.params.data.tags to include both existing and newly created tags
  //     data.params.data.tags = existingTags
  //       .map((tag) => ({ id: tag.id, name: tag.name })) // Include existing tags
  //       .concat(createdTags.map((tag) => ({ id: tag.id, name: tag.name }))); // Include newly created tags
  //   }
  // },

  //#####################################################################################
  // send mail to approver while creating blog

  // async afterCreate(event) {
  //   const { result } = event;
  //   try {

  //     // Get all admin users
  //     // const adminUsers = await strapi.query("admin::user").findMany();
  //     // Get all subscribers (assuming you have a 'subscriber' collection)
  //     const subscribers = await strapi.query("api::blog.blog").findMany();
  //     // Get the "approver" role
  //     const approverRole = await strapi
  //       .query("admin::role")
  //       .findOne({ where: { name: "approver" } });
  //     // Get all users with the "approver" role
  //     const approverUsers = await strapi.query("admin::user").findMany({
  //       where: { roles: { id: approverRole.id } },
  //     });
  //     // Extract emails of approver users
  //     const recipients = approverUsers.map((user) => user.email);
  //     console.log("recipients", recipients);
  //     // Send email notification if there are recipients
  //     if (recipients.length > 0) {
  //       await strapi.plugins["email"].services.email.send({
  //         to: recipients,
  //         subject: `New Blog Post: ${result.title}`,
  //         html: `
  //           <h1>New Blog Post Published</h1>
  //           <h2>${result.title}</h2>
  //           <p>${result.description || "No description available"}</p>
  //           <p>Published on: ${new Date(result.publishedAt).toLocaleDateString()}</p>
  //         `,
  //       });
  //       // Log success
  //       strapi.log.info(
  //         `Email notification sent for blog post: ${result.title}`
  //       );
  //     } else {
  //       strapi.log.info("No approver users found to send email notification.");
  //     }
  //   } catch (error) {
  //     strapi.log.error("Error sending email notification:", error);
  //   }
  // },

  async afterCreate(event) {
    const { result } = event;

    try {
      if (Array.isArray(result.tags) && result.tags.length > 0) {
        console.log("Tags before processing:", result.tags);

        // Fetch existing tags
        const existingTags = await strapi.entityService.findMany(
          "api::tag.tag",
          {
            fields: ["name"],
          }
        );

        console.log("Existing Tags:", existingTags);

        // Extract tag names (handle both object and string cases)
        const existingTagNames = existingTags.map((tag) => tag.name);
        const newTags = result.tags
          .map((tag) => (typeof tag === "object" && tag.name ? tag.name : tag)) // Ensure string format
          .filter((tag) => !existingTagNames.includes(tag));

        console.log("New Tags to be Created:", newTags);

        // Create new tags
        for (const tag of newTags) {
          if (typeof tag === "string") {
            const createdTag = await strapi.entityService.create(
              "api::tag.tag",
              {
                data: {
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, "-"), // Ensure slug format
                },
              }
            );
            console.log("Created Tag:", createdTag);
          } else {
            console.warn("Skipping invalid tag:", tag);
          }
        }
      } else {
        console.log("No new tags to be added.");
      }
    } catch (error) {
      console.error("Error in afterCreate hook while processing tags:", error);
    }
  },
};
