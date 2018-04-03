let production = process.env.NODE_ENV == 'production' ? true : false; 

// 'http://apiserver2.vrguest.com/api/live/8a1bac27dfdd72997f12cc1851c99709/vrgapi/index.cfm/'

module.exports = {
  port: production ? 8000 : 5000,
  host: production ? 'localhost' : 'localhost',
  api: production ? 'http://internal-frontend-cf-823211961.us-east-1.elb.amazonaws.com/vrgapi/index.cfm/' : 'http://52.54.105.28/vrgapi/index.cfm/',
  aws: production ? 'https://s3.amazonaws.com/vrguest-assets/' : 'https://s3.amazonaws.com/vrguest-assets/',
  mock: production ? 'http://localhost:5001' : 'http://localhost:5001/',
  blog: production ? 'https://travelstars.vrguest.com/' : 'https://travelstars.vrguest.com/',
  currency: production ? '$' : '$',
  baseUrl: 'https://www.vrguest.com/',
  adImagesBaseUrl: 'https://s3.amazonaws.com/vrguest-assets/advertisement/',
  s3Bucket: 'https://s3.amazonaws.com/vrguest-assets/'
};
