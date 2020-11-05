module.exports = {
  webpack: config => {
    // config.module.rules.push({
    //   test: /\.tsx$/,
    //   use: [
    //     {
    //       loader: 'astroturf/loader',
    //       options: { extension: '.module.css' },
    //     },
    //   ],
    // });

    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            extension: '.module.css',
          },
        },
      ],
    });

    return config;
  },
};
