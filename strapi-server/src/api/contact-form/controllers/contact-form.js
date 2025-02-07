module.exports = {
  async submit(ctx) {
    try {
      const { name, email, message } = ctx.request.body;

      if (!name || !email || !message) {
        return ctx.badRequest("All fields are required");
      }

      await strapi.plugins["email"].services.email.send({
        to: "your-email@example.com",
        from: "no-reply@example.com",
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      return ctx.send({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return ctx.internalServerError("Could not send email");
    }
  },
};
