/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';
import compression from 'compression';
import config from '../src/config';

const port = 8000;
const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.resolve(__dirname, '..', 'dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/mock/*', proxy({
  target: config.mock,
  pathRewrite: {'^/mock/': ''}
}));
app.use('/api/*', proxy({
  target: config.api,
  pathRewrite: {'^/api/': ''},
  changeOrigin: true
}));
app.use('/aws/*', proxy({
  target: config.aws,
  pathRewrite: {'^/aws/': ''},
  changeOrigin: true
}));
app.use('/travel-star/*', proxy({
  changeOrigin: true,
  target: config.blog,
  secure: false,
  pathRewrite: {'^/travel-star/': ''}
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'app.html'));
});

app.listen(port, () => {
  console.log(
    `
    =====================================================
    -> Production Server Running at port ${port}...
    =====================================================
  `
  );
});

/* eslint-enable no-console */
