module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contact/submit",
      handler: "contact.submit",
      config: {
        policies: [],
      },
    },
  ],
};
