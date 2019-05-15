import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import routes from './routes'
import path from 'path'
import layout from 'express-ejs-layouts'

const app = express();

const API_PORT = process.env.API_PORT || 3003;

const swaggerDefinition = {
  info: {
    title: 'MySQL Registration Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:3003',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*/*.js',],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

require('./config/passport');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

// routes APIs
routes(app)

// Views
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, './public'));
app.use(layout);

app.use(express.static('public'))
app.use((req, res) => res.redirect('/'));



app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


// setTimeout(() => {
//   require('./crawler-vnexpress')
//   require('./crawler-tuoitre')
//   require('./crawler-tienphong')
// }, 1000);
module.exports = app;
