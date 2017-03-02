const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/golden-owl-test',
  port: process.env.PORT || 3001,
};

if (process.env.NODE_ENV === 'production') {
  config.mongoURL = 'mongodb://hieuhlc:123123@ds161169.mlab.com:61169/heroku_x97bsbq6'
}

export default config;
