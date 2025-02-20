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
        host: "smtp.gmail.com",
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_EMAIL"), // Your email
          pass: env("SMTP_PASSWORD"), // Your email password
        },
      },
      settings: {
        defaultFrom: env("SMTP_EMAIL"),
        defaultReplyTo: env("SMTP_EMAIL"),
      },
    },
  },
});
