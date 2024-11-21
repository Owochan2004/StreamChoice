const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org', // Wikimedia
      'm.media-amazon.com',   // Amazon media
      'i.imgur.com',          // Imgur
      'image.tmdb.org',       // TMDB (The Movie Database)
      'e.rpp-noticias.io',
      'occ-0-8407-114.1.nflxso.net',
      "m.media-amazon.com",
      "images.cdn.prd.api.discomax.com"
      // Agrega aquí otros dominios que planeas usar
    ],
  },
};

module.exports = nextConfig;