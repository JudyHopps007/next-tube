const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPreact = require('next-plugin-preact');

module.exports = withBundleAnalyzer(
  withPreact({
    images: {
      domains: ['i.ytimg.com'],
    },
  })
);
