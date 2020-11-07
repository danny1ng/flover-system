module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: { extension: '.module.css' },
        },
      ],
    });

    return config;
  },
};
