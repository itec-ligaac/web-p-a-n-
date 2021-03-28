const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const hotelRouter = require('./routes/hotelRoute');
const offerRouter = require('./routes/offerRoute');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Set security HTTP headers
app.use(helmet());

// Limit request from same user
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api/', limiter);

// Body parser, reading data from body into rq.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  if (!req.url.search('check')) {
    console.log(req.url);
    console.log(req.query);
  }
  next();
})

app.use('/api/check', (req, res, next) => {
  res.status(200).json({});
});

app.use('/api/hotel', hotelRouter);
app.use('/api/offer', offerRouter);

// 404 Error not found handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling
app.use(globalErrorHandler);

module.exports = app;
