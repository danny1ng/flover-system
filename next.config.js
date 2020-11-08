module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: 'astroturf/loader',
          options: { extension: '.module.css' },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|ico|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `/_next/static/media/`,
            outputPath: `${isServer ? '../' : ''}static/media/`,
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};
