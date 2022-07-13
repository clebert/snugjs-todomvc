/** @type {import('aws-simple').ConfigFileDefaultExport} */
export default () => ({
  routes: [
    {
      type: `folder`,
      publicPath: `/*`,
      path: `dist`,
      responseHeaders: {
        'Cache-Control': `max-age=${365 * 24 * 60 * 60}, immutable, public`,
      },
    },
  ],
});
