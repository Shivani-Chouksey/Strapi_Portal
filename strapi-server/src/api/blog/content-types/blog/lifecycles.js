module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const approvers = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        filters: { role: { name: "approver" } }, // Fetch all users with the "approver" role
        fields: ["email"],
      }
    );

    if (approvers.length > 0) {
      const emailAddresses = approvers.map((user) => user.email);

      await strapi.plugins["email"].services.email.send({
        to: emailAddresses,
        subject: "New Blog Post Pending Approval",
        text: `A new blog post titled "${result.title}" has been created. Please review and approve it.`,
        html: `<p>A new blog post titled "<strong>${result.title}</strong>" has been created.</p><p>Please review and approve it.</p>`,
      });
    }
  },
};
