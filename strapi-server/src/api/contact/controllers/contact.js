"use strict";

const formService = require("../services/contact");

module.exports = {
  async submit(ctx) {
    try {
      // Access the form data from the request body
      const formData = ctx.request.body;

      // Use the service to create a new form entry and send the email
      const response = await formService.createFormEntry(formData);

      // Return the structured response
      return ctx.send(response);
    } catch (error) {
      // Handle errors
      return ctx.badRequest("An error occurred", { error: error.message });
    }
  },
};
