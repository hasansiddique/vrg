/* eslint-disable no-console */

let jsonServer = require('json-server');
let server = jsonServer.create();
let router = jsonServer.router('./mock-server/db.json');
let middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(['/login', '/users/:id', '/register'], function (req, res, next) {
  res.send({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjMwNzcsInRzIjoiRGVjZW1iZXIsIDE5IDIwMTcgMDg6NTY6MjQifQ.iW7PYS69N3DSoqRIifrtXTYFEABnIkNC4_wWN8Z99wM',
    user: {
      userName: 'hasan@vrguest.com',
      name: 'Hasan Siddique'
    }
  }).status(200);
});

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.method = 'GET';
    req.query = req.body;
  }
  next();
});

server.use(router);

server.listen(5001, function () {
  console.log(
    `
    =====================================================
    -> Mock Server Running at port 5001...
    =====================================================
  `
  );
});

/* eslint-enable no-console */
