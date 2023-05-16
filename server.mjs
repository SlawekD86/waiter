const jsonServer = require('json-server');
const { API_URL } = require('./config');

const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});
const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use((req, res, next) => {
  if (req.method === 'PUT') {
    req.method = 'POST';
  }
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
