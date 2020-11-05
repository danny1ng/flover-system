module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: [
              '>0.2%',
              'not dead',
              'not ie <= 11',
              'not op_mini all',
              'not android 4.2-4.3',
              'not android 4.4.3-4.4.4',
              'not Safari < 11',
              'not iOS < 11',
              'not Samsung < 10',
            ],
          },
        },
      },
    ],
    'linaria/babel',
  ],
};
