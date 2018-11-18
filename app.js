/**
 * Module dependencies.
 */
const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');

const widgetController = require('./api/widget');
const deviceController = require('./api/device');
const authenticationController = require('./api/authentication');
const authCheckMiddleware = require('./middleware/auth-check');

const app = express();

dotenv.load({ path: '.env' });
const isDev = app.get('env') === 'development';

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/fabric/authenticate', authenticationController.authenticate);
app.use('/api', authCheckMiddleware);
app.get('/api/fabric/device/status', deviceController.getStatus);
app.get('/api/v1/fabric/widget', widgetController.getWidgetList);
app.get('/api/v1/fabric/widget/:id', widgetController.getWidget);
app.use(errorHandler());

app.set('httpsPort', process.env.PORT || (isDev ? 8000 : 443));

// SSL keys
const options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

https.createServer(options, app).listen(app.get('httpsPort'), () => {
  console.log('%s App is running at https://localhost:%d in %s mode', chalk.green('✓'), app.get('httpsPort'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
