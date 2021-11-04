module.exports = {
  async redirects() {
    return [
      {
        source: "/notes/:slug",
        destination: "/p/:slug",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
