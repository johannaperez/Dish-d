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
    clientSecret: '4f698c66684cf989dddeb6cce4fb3355',
    callbackURL: 'http://localhost:1337/auth/facebook/callback'
  },
  GOOGLE: {
    clientID: '405517878236-493ai7memfuvad4dpmi4haniq0o1dshl.apps.googleusercontent.com',
    clientSecret: 'k3d-wl6X3_K23Vhw0d1EmoOu',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  },
  LOGGING: true,
  NATIVE: true
};
