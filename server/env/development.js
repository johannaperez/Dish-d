module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/dishd',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: '1798317553747617',
    clientSecret: '1f4efd52e49a5366c8a50b8b3647f42f',
    callbackURL: 'http://localhost:1337/auth/facebook/callback'
  },
  GOOGLE: {
    clientID: '405517878236-493ai7memfuvad4dpmi4haniq0o1dshl.apps.googleusercontent.com',
    clientSecret: 'pxot-QA273WNhdRAHBzNbZq1',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  },
  LOGGING: true,
  NATIVE: true
};
