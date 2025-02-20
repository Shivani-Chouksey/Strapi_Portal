// "use strict";

// module.exports = {
//   async createFormEntry(data) {
//     try {
//       console.log("data inside service", data);

//       // Create a new entry in the 'form' collection
//       //   const entry = await strapi.services.form.create(data);

//       // Prepare the email content
//       const emailContent = `
//        <h1>New Enquery  Submission - Contact Page</h1>
//        <p><strong>Name:</strong> ${data.name} - ${data.lastname}</p>
//        <p><strong>Email:</strong> ${data.email}</p>
//        <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
//        <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
//      `;

//       // Send the email
//       await strapi.plugins["email"].services.email.send({
//         to: "shivani.chouksey@digitalsalt.in", // Replace with the recipient's email
//         subject: `New Form Submission - ${data.subject}`,
//         html: emailContent,
//       });

//       console.log("send successfull");

//       return ;
//     } catch (error) {
//       throw new Error("Error creating form entry: " + error.message);
//     }
//   },
// };

"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async createFormEntry(data) {
    try {
      // Create a new entry in the 'form' collection
      await strapi.entityService.create("api::contact.contact", {
        data,
      });

      // Prepare the email content
      const emailContent = `
      <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #007bff; padding: 20px; color: white; text-align: center;">
            <h1 style="margin: 0;">New Enquiry Submission</h1>
            <p style="margin: 0;">Contact Page</p>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${data.firstName} ${data.lastname}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Contact Number:</strong> ${data.phone}</p>
            <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
            <p style="margin: 0; color: #777;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

      // Send the email
      await strapi.plugins["email"].services.email.send({
        to: "shivani.chouksey@digitalsalt.in", // Replace with the recipient's email
        subject: `New Form Submission - ${data.subject}`,
        html: emailContent,
      });

      // Return a structured response
      return {
        status: 200,
        message: "Form submitted successfully !",
      };
    } catch (error) {
      throw new Error("Error creating form entry: " + error.message);
    }
  },
};
