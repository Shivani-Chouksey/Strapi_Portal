module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contact-form/submit",
      handler: "contact-form.submit",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
