module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: { folder: "strapi" }, // Optional: Set a folder for uploaded files
        delete: { folder: "strapi" }, // Optional: Folder for file deletion
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.example.com", // Your SMTP server
        port: 587,
        auth: {
          user: "your-email@example.com",
          pass: "your-email-password",
        },
      },
      settings: {
        defaultFrom: "no-reply@example.com",
        defaultReplyTo: "your-email@example.com",
      },
    },
  },
});
